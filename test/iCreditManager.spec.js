const utils = require("./testUtils");
const expect = require('chai').expect;
const iCreditManager = require('../managers/iCreditManager');
const CompanyModel = require("../models/CompanyModel");
const PaymentModel = require("../models/PaymentModel");
const TEST_CREDIT_CARD_TOKEN = "0a1b8304-36e6-4a11-bdc7-b43c92fc2a25";

describe('iCreditManager', function () {
    this.timeout(utils.TIMEOUT);

    it('createSaleToken', async () => {
        let {saleToken} = await iCreditManager.createSale();

        expect(!!saleToken).to.be.true;
        console.log("SaleToken: " + saleToken);
    });

    it('generateCustomerTransactionId', async () => {
        let {customerTransactionId, authNum} = await iCreditManager.chargeSimple(TEST_CREDIT_CARD_TOKEN);

        expect(!!customerTransactionId).to.be.true;
        expect(!!authNum).to.be.true;
        console.log("customerTransactionId: " + customerTransactionId);
        console.log("authNum: " + authNum);
    });

    // TODO need to think how to test completeSale - dependes on CreateSale & ChargeSimple
    it('completeSale', async () => {
        const saleToken = "e7827d4f-a09a-4960-907e-ae24c4a2fff7";
        const customerTransactionId = "c9efcb89-2af4-433b-8eb7-b22573746585";

        let result = await iCreditManager.completeSale(saleToken, customerTransactionId);

        expect(result).to.be.true;
    });

    it('generateWaitingPayment', async () => {
        let result = await iCreditManager.generateWaitingPayment(TEST_CREDIT_CARD_TOKEN);

        expect(result).to.be.true;
    });

    it('generateImmediatePayment', async () => {
        let authNum = "2332108";
        let customerTransactionId = "5b643290-7bfc-4303-bf6d-efcc9dcb95f5";
        const email = "chenop@gmail.com";
        let first = "Chen";
        let last = "Oppenhaim";

        let result = await iCreditManager.generateImmediatePayment(TEST_CREDIT_CARD_TOKEN, authNum, customerTransactionId, email, first, last);

        expect(result).to.be.true;
    });

    it('handleIPNCall', async () => {
        let companyObject = utils.createMockedCompanyPlainObject("Toluna");
        let company = await CompanyModel.createCompany(companyObject);
        let paymentObject = utils.createMockedPaymentPlainObject(company._id);
        let payment = await PaymentModel.createPayment(paymentObject);

        let data = {
            Custom1: company._id,
            TransactionToken: TEST_CREDIT_CARD_TOKEN,
            SaleId: "333-444-555"
        };

        await iCreditManager.handleIPNCall(data);

        let updateCompany = await CompanyModel.getByCompanyId(company);
        expect(updateCompany.paymentData).to.not.be.null;
        expect(updateCompany.paymentData.creditCardToken).to.not.be.null;
        expect(updateCompany.paymentData.customerTransactionId).to.not.be.null;
        expect(updateCompany.paymentData.authNum).to.not.be.null;
    });
});
