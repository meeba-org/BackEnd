const {PAYMENT_BASE_URL} = require("../config");
const axios = require('axios');

const CREATE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CreateSale`;
const CHARGE_SIMPLE = `https://testpci.rivhit.co.il/api/iCreditRestApiService.svc/ChargeSimple/Full;`;
const COMPLETE_SALE = `https://${PAYMENT_BASE_URL}/API/PaymentPageRequest.svc/CompleteSale`;
const GROUP_PRIVATE_TOKEN = "a1408bfc-18da-49dc-aa77-d65870f7943e";
const CREDIT_BOX_TOKEN = "7cd7ca78-e67c-4909-94b7-22fd19e42ad4";

const createSaleToken = async () => {
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
    };

    try {
        const response = await axios.post(CREATE_SALE, data);
        return response.SaleToken;
    } catch (err) {
        console.error("[CreateSale] has failed");
    }
};

async function generateCustomerTransactionId(creditCardToken) {
    let data = {
        "Token": creditCardToken,
        "CreateToken": true,
        "Currency": 1,
        "CreditboxToken": CREDIT_BOX_TOKEN,
        "Amount": 100,
        "TransactionType": 11, // הוראת קבע
        "ParamJ": 5
    };

    try {
        const response = await axios.post(CHARGE_SIMPLE, data);
        return response.CustomerTransactionId;
    } catch (err) {
        console.error("[ChargeSimple] has failed");
    }
}

async function completeSale(saleToken, customerTransactionId) {
    let data = {
        "CustomerTransactionId": customerTransactionId,
        "SaleToken": saleToken
    };

    try {
        return await axios.post(COMPLETE_SALE, data);
    } catch (err) {
        console.error("[CompleteSale] has failed");
    }
}

export const generateWaitingPayment = async (creditCardToken) => {
    const saleToken = await createSaleToken();
    const customerTransactionId = await generateCustomerTransactionId(creditCardToken);

    return await completeSale(saleToken, customerTransactionId);
};

