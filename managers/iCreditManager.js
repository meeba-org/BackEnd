const {PAYMENT_BASE_URL, PAYMENT_PCI_BASE_URL} = require("../config");
const axios = require('axios');
const PaymentModel = require("../models/PaymentModel");
const CompanyModel = require("../models/CompanyModel");
const {MONTHLY_SUBSCRIPTION_PRICE} = require("../constants");

const CREATE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CreateSale`;
const CHARGE_SIMPLE = `https://${PAYMENT_PCI_BASE_URL}/api/iCreditRestApiService.svc/ChargeSimple/Full`;
const COMPLETE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CompleteSale`;
const SALE_CHARGE_TOKEN = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/SaleChargeToken`;
const GROUP_PRIVATE_TOKEN = "af4517a6-a5dc-4ef2-9f2d-d85193edc889";
const CREDIT_BOX_TOKEN = "1c176e94-5299-44ab-82ec-2ca33d7f54d6";

const createSale = async (email) => {
    let data = {
        "GroupPrivateToken": GROUP_PRIVATE_TOKEN,
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
        "CustomerLastName":"ddd"
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
        "CreditboxToken": CREDIT_BOX_TOKEN,
        "Amount": MONTHLY_SUBSCRIPTION_PRICE ,
        //"TransactionType": 11, // הוראת קבע
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

const generateWaitingPayment = async (creditCardToken, email = "") => {
    console.log(`Create Sale email: ${email}, ccToken: ${creditCardToken}`);
    const createSaleResult = await createSale(email);
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

    let {email} = company;
    let {creditCardToken, customerTransactionId, authNum} = company.paymentData;

    if (!customerTransactionId || !creditCardToken || !authNum)
        throw new Error(`customerTransactionId or creditCardToken or authNum is missing for company id ${companyId}`);
    await generateImmediatePayment0(creditCardToken, authNum, customerTransactionId, email);
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
        "GroupPrivateToken": GROUP_PRIVATE_TOKEN,
        "CreditcardToken": creditCardToken,
        "CustomerLastName": firstName,
        "CustomerFirstName": lastName,
        "EmailAddress": email,
        "Currency": 1,
        "SaleType": 1,
        "AuthNum": authNum, //"2332108",
        "J5CustomerTransactionId": customerTransactionId, //"5b643290-7bfc-4303-bf6d-efcc9dcb95f5",
        "Items": [
            {
                "UnitPrice": 20,
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
    }
};

async function generateWaitingPaymentAndSave(creditCardToken, email, companyId) {
    let waitingPayment = await generateWaitingPayment(creditCardToken, email);
    console.log(JSON.stringify(waitingPayment));
    await updateCompanyWithPaymentData(companyId, {
        customerTransactionId: waitingPayment.customerTransactionId,
        authNum: waitingPayment.authNum
    });
}

const handleIPNCall = async data => {
    const {Custom1: companyId, SaleId: saleId, TransactionToken: creditCardToken, EmailAddress: email} = data;

    await updateCompanyWithPaymentData(companyId, {
        creditCardToken,
        email
    });
    await updatePaymentWithSaleId(companyId, saleId);

    await generateWaitingPaymentAndSave(creditCardToken, email, companyId);
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
    await CompanyModel.updateCompany(company);
};

const chargePremiumPlanCompanies = async () => {
    let premiumPlanCompanies = await CompanyModel.getPremiumPlanCompanies();

    if (!premiumPlanCompanies)
        return;

    for (const company of premiumPlanCompanies) {
        let {creditCardToken, authNum, customerTransactionId} = company.paymentData;
        await generateImmediatePayment(creditCardToken, authNum, customerTransactionId, company.email);
    }
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
    handleIPNCall
};


