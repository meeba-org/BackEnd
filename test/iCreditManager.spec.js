const TIMEOUT = require("./testUtils").TIMEOUT;
const expect = require('chai').expect;
const iCreditManager = require('../managers/iCreditManager');
const TEST_CREDIT_CARD_TOKEN = "0a1b8304-36e6-4a11-bdc7-b43c92fc2a25";

describe('iCreditManager', function () {
    this.timeout(TIMEOUT);

    it('createSaleToken', async () => {
        let saleToken = await iCreditManager.createSaleToken();

        expect(!!saleToken).to.be.true;
        console.log("SaleToken: " + saleToken);
    });

    it('generateCustomerTransactionId', async () => {
        let customerTransactionId = await iCreditManager.generateCustomerTransactionId(TEST_CREDIT_CARD_TOKEN);

        expect(!!customerTransactionId).to.be.true;
        console.log("customerTransactionId: " + customerTransactionId);
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
});
