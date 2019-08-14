const {PAYMENT_BASE_URL} = require("../config");
const axios = require('axios');
const PaymentModel = require("../models/PaymentModel");
const CompanyModel = require("../models/CompanyModel");

const CREATE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CreateSale`;
const CHARGE_SIMPLE = `https://testpci.rivhit.co.il/api/iCreditRestApiService.svc/ChargeSimple/Full`;
const COMPLETE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CompleteSale`;
const SALE_CHARGE_TOKEN = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/SaleChargeToken`;
const GROUP_PRIVATE_TOKEN = "a1408bfc-18da-49dc-aa77-d65870f7943e";
const CREDIT_BOX_TOKEN = "7cd7ca78-e67c-4909-94b7-22fd19e42ad4";

const createSale = async () => {
    let data = {
        "GroupPrivateToken": GROUP_PRIVATE_TOKEN,
        "Items": [
            {
                "Quantity": 1,
                "UnitPrice": 20,
                "Description": "מנוי חודשי לאתר מיבא"
            }
        ],
        "ExemptVAT": true,
        "MaxPayments": 1,
        "SaleType": 2,
        // TODO add the email here
        "CustomerLastName":"ddd"
    };

    try {
        const response = await axios.post(CREATE_SALE, data);
        let {SaleToken} = response.data;
        return {
            saleToken: SaleToken
        };
    } catch (err) {
        console.error("[CreateSale] has failed");
    }
};

const chargeSimple = async creditCardToken => {
    let data = {
        "Token": creditCardToken,
        "CreateToken": true,
        "Currency": 1,
        "CreditboxToken": CREDIT_BOX_TOKEN,
        "Amount": 20,
        "TransactionType": 11, // הוראת קבע
        "ParamJ": 5
    };

    try {
        const response = await axios.post(CHARGE_SIMPLE, data);
        let {CustomerTransactionId, AuthNum} = response.data;
        return {
            customerTransactionId: CustomerTransactionId,
            authNum: AuthNum
        };
    } catch (err) {
        console.error("[ChargeSimple] has failed");
    }
};

const completeSale = async (saleToken, customerTransactionId) => {
    let data = {
        "CustomerTransactionId": customerTransactionId,
        "SaleToken": saleToken
    };

    try {
        const response = await axios.post(COMPLETE_SALE, data);
        let status = response.data.Status;

        if (status !== 0)
            throw new Error(`status: ${status}`);

        return true;
    } catch (err) {
        console.error(`[CompleteSale] has failed - ${err.message}`);
    }
};

const generateWaitingPayment = async (creditCardToken) => {
    const createSaleResult = await createSale();
    let {saleToken} = createSaleResult;
    const chargeSimpleResult = await chargeSimple(creditCardToken);
    let {customerTransactionId, authNum} = chargeSimpleResult;

    let result = await completeSale(saleToken, customerTransactionId);
    return {
        saleToken,
        customerTransactionId,
        authNum
    };
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
const generateImmediatePayment = async (creditCardToken, authNum, customerTransactionId, email, firstName = "", lastName = "") => {
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
        let status = response.data.Status;

        if (status !== 0)
            throw new Error(`status: ${status}`);

        return true;
    } catch (err) {
        console.error(`[generateImmediatePayment] has failed - ${err.message}`);
    }
};

const handleIPNCall = async data => {
    const {Custom1: companyId, SaleId: saleId, TransactionToken: creditCardToken} = data;

    await updateCompanyWithPaymentData(companyId, {
        creditCardToken
    });
    await updatePaymentWithSaleId(companyId, saleId);

    let waitingPayment = await generateWaitingPayment(creditCardToken);
    await updateCompanyWithPaymentData(companyId, {
        customerTransactionId: waitingPayment.customerTransactionId,
        authNum: waitingPayment.authNum
    });
};

const updatePaymentWithSaleId = async (companyId, saleId) => {
    // Update Payment with SaleId
    let payment = await PaymentModel.getLatestByCompanyId(companyId);
    if (!payment)
        throw new Error("[generalController] - IPN, Could not find payment, companyId: " + companyId);

    payment.saleId = saleId;
    PaymentModel.updatePayment(payment);
};

const updateCompanyWithPaymentData = async (companyId, paymentData) => {
    let company = await CompanyModel.getByCompanyId(companyId);
    let orgPaymentData = company.paymentData || {};

    company.paymentData = {
        ...orgPaymentData,
        ...paymentData
    };

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

module.exports = {
    createSale,
    generateWaitingPayment,
    chargeSimple,
    completeSale,
    generateImmediatePayment,
    handleIPNCall
};


