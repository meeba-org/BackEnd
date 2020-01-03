const {PAYMENT_BASE_URL, PAYMENT_PCI_BASE_URL} = require("../config");
const axios = require('axios');
const PaymentModel = require("../models/PaymentModel");
const CompanyModel = require("../models/CompanyModel");
const {MONTHLY_SUBSCRIPTION_PRICE} = require("../constants");

const GetUrl = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/GetUrl`;
const CREATE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CreateSale`;
const CHARGE_SIMPLE = `https://${PAYMENT_PCI_BASE_URL}/api/iCreditRestApiService.svc/ChargeSimple/Full`;
const COMPLETE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CompleteSale`;
const SALE_CHARGE_TOKEN = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/SaleChargeToken`;
const TEST_GROUP_PRIVATE_TOKEN = "f930c192-ea2b-4e53-8de8-27d3a74fab66";
const PRODUCTION_GROUP_PRIVATE_TOKEN = "af4517a6-a5dc-4ef2-9f2d-d85193edc889";
const TEST_CREDIT_BOX_TOKEN = "7cd7ca78-e67c-4909-94b7-22fd19e42ad4";
const PRODUCTION_CREDIT_BOX_TOKEN = "1c176e94-5299-44ab-82ec-2ca33d7f54d6";

const createIframeUrl = async (user, company) => {
    let data = {
        "GroupPrivateToken": PRODUCTION_GROUP_PRIVATE_TOKEN,
        "Items": [{
            "Quantity": 1,
            "UnitPrice": MONTHLY_SUBSCRIPTION_PRICE,
            "Description": "מנוי חודשי לאתר מיבא",
        }],
        "RedirectURL": "https://meeba.co.il/paymentSuccess",
        "ExemptVAT": true,
        "MaxPayments": 1,
        "SaleType": 3, // איסוף כרטיס בלבד - ללא גבייה
        "EmailAddress": user.company.email || null,
        "CustomerLastName": user.company.name || null,
        "HideItemList": true,
        "IPNURL": "https://meeba.co.il/api/general/ipn",
        "Custom1": company._id // Storing this in order to link the return transaction token to the company
    };

    try {
        const response = await axios.post(GetUrl, data);
        let {URL, PrivateSaleToken, PublicSaleToken} = response.data;
        if (!URL)
            throw new Error("iCredit החזיר שגיאה");

        const payment = {
            company: company._id,
            url: URL,
            privateSaleToken: PrivateSaleToken,
            publicSaleToken: PublicSaleToken,
            status: 0 // EPaymentStatus.START, // TODO GoPremium fix this
        };
        PaymentModel.createPayment(payment); // No need to wait for it
        return response.data.URL;
    } catch (err) {
        console.error(err.toString());
        throw new Error("iCredit החזיר שגיאה");
    }
};

const createSale = async (email, companyName) => {
    let data = {
        "GroupPrivateToken": PRODUCTION_GROUP_PRIVATE_TOKEN,
        "Items": [
            {
                "Quantity": 1,
                "UnitPrice": MONTHLY_SUBSCRIPTION_PRICE,
                "Description": "מנוי חודשי לאתר מיבא"
            }
        ],
        "ExemptVAT": true,
        "MaxPayments": 1,
        "SaleType": 2,
        "EmailAddress": email,
        "CustomerLastName": companyName
    };

    const response = await axios.post(CREATE_SALE, data);
    if (hasICreditError(response))
        throw new Error(`[CreateSale] - Error! response: ${JSON.stringify(response.data)}`);

    let {SaleToken} = response.data;

    return {
        saleToken: SaleToken
    };
};

const chargeSimple = async creditCardToken => {
    let data = {
        "Token": creditCardToken,
        "CreateToken": true,
        "Currency": 1,
        "CreditboxToken": PRODUCTION_CREDIT_BOX_TOKEN,
        "Amount": MONTHLY_SUBSCRIPTION_PRICE ,
        // "TransactionType": 11, // הוראת קבע במסוף EMV
        "ParamJ": 5
    };

    const response = await axios.post(CHARGE_SIMPLE, data);
    if (hasICreditError(response))
        throw new Error(`[ChargeSimple] - Error! response: ${JSON.stringify(response.data)}`);

    let {CustomerTransactionId, AuthNum} = response.data;

    return {
        customerTransactionId: CustomerTransactionId,
        authNum: AuthNum
    };
};

const completeSale = async (saleToken, customerTransactionId) => {
    let data = {
        "CustomerTransactionId": customerTransactionId,
        "SaleToken": saleToken
    };

    const response = await axios.post(COMPLETE_SALE, data);
    if (hasICreditError(response))
        throw new Error(`[CompleteSale] - Error! response: ${JSON.stringify(response.data)}`);

    return true;
};

const generateWaitingPayment = async (creditCardToken, email = "", companyName = "") => {
    console.log(`Create Sale email: ${email}, ccToken: ${creditCardToken}`);
    const createSaleResult = await createSale(email, companyName);
    console.log(`Create Sale Result ${JSON.stringify(createSaleResult)}`);
    let {saleToken} = createSaleResult;

    const chargeSimpleResult = await chargeSimple(creditCardToken);
    console.log(`Charge Simple Result: ${JSON.stringify(chargeSimpleResult)}`);
    let {customerTransactionId, authNum} = chargeSimpleResult;

    await completeSale(saleToken, customerTransactionId);
    return {
        saleToken,
        customerTransactionId,
        authNum
    };
};

const generateImmediatePayment = async (companyId) => {
    let company = await CompanyModel.getByCompanyId(companyId);
    if (!company)
        throw new Error(`Company id ${companyId} was not found`);

    if (!company.paymentData) {
        throw new Error(`No Payment daya for company id ${companyId}`);
    }

    let {email, name} = company;
    let {creditCardToken, customerTransactionId, authNum} = company.paymentData;

    if (!customerTransactionId || !creditCardToken || !authNum)
        throw new Error(`customerTransactionId or creditCardToken or authNum is missing for company id ${companyId}`);
    await generateImmediatePayment0(creditCardToken, authNum, customerTransactionId, email, "", name);
};

/**
 * https://icredit.rivhit.co.il/API/PaymentPageRequest.svc/help/operations/ExecuteSale
 * @param creditCardToken
 * @param authNum
 * @param customerTransactionId
 * @param email
 * @param firstName
 * @param lastName
 * @return {Promise<boolean>}
 */
const generateImmediatePayment0 = async (creditCardToken, authNum, customerTransactionId, email, firstName = "", lastName = "") => {
    let data = {
        "GroupPrivateToken": PRODUCTION_GROUP_PRIVATE_TOKEN,
        "CreditcardToken": creditCardToken,
        "CustomerLastName": lastName,
        "CustomerFirstName": firstName,
        "EmailAddress": email,
        "Currency": 1,
        "SaleType": 1,
        "AuthNum": authNum, //"2332108",
        "J5CustomerTransactionId": customerTransactionId, //"5b643290-7bfc-4303-bf6d-efcc9dcb95f5",
        "Items": [
            {
                "UnitPrice": MONTHLY_SUBSCRIPTION_PRICE,
                "Quantity": 1,
                "Description": "מנוי חודשי לאתר מיבא"
            }
        ]
    };

    try {
        const response = await axios.post(SALE_CHARGE_TOKEN, data);
        console.log(response.data);

        if (hasICreditError(response))
            throw new Error(`[generateImmediatePayment] - Error! response: ${JSON.stringify(response.data)}`);

        return true;
    } catch (err) {
        console.error(`[generateImmediatePayment] has failed - ${err.message}`);
        throw err;
    }
};

async function generateWaitingPaymentAndSave(creditCardToken, email, companyId, companyName) {
    let waitingPayment = await generateWaitingPayment(creditCardToken, email, companyName);
    console.log(JSON.stringify(waitingPayment));
    await updateCompanyWithPaymentData(companyId, {
        customerTransactionId: waitingPayment.customerTransactionId,
        authNum: waitingPayment.authNum
    });
}

const handleIPNCall = async data => {
    const {Custom1: companyId, SaleId: saleId, TransactionToken: creditCardToken, EmailAddress: email} = data;

    if (!creditCardToken)
        throw new Error (`[handleIPNCall] - no TransactionToken found in data for companyId ${companyId}`);

    let updatedCompany = await updateCompanyWithPaymentData(companyId, {
        creditCardToken,
        email
    });
    await updatePaymentWithSaleId(companyId, saleId);

    await generateWaitingPaymentAndSave(creditCardToken, email, companyId, updatedCompany.name);
};

const updatePaymentWithSaleId = async (companyId, saleId) => {
    // Update Payment with SaleId
    let payment = await PaymentModel.getLatestByCompanyId(companyId);
    if (!payment)
        throw new Error("[generalController] - IPN, Could not find payment, companyId: " + companyId);

    payment.saleId = saleId;
    console.log(`[iCreditManager] - Update Payment ${payment._id} with SaleId: ${saleId}`);
    PaymentModel.updatePayment(payment);
};

const updateCompanyWithPaymentData = async (companyId, newPaymentData) => {
    let company = await CompanyModel.getByCompanyId(companyId);
    if (!company)
        throw new Error(`[iCreditManager] - No such Company id: ${companyId}`);
    let orgPaymentData = company.paymentData || {};

    company.paymentData = {
        ...orgPaymentData,
        ...newPaymentData
    };

    console.log(`[iCreditManager] - Updating Company ${company.name} with ${JSON.stringify(newPaymentData)}`);
    return await CompanyModel.updateCompany(company);
};

const hasICreditError = response => response.data.Status !== 0;

module.exports = {
    createSale,
    generateWaitingPayment,
    generateWaitingPaymentAndSave,
    chargeSimple,
    completeSale,
    generateImmediatePayment,
    generateImmediatePayment0,
    handleIPNCall,
    createIframeUrl
};


