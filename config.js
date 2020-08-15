const fs = require('fs');
const dotEnvFile = '.env';

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development';

if (!module.exports.dbUri)
    init();

function readEnvFileIfExists () {
    if (fs.existsSync(dotEnvFile)) {
        require('dotenv').config({
            path: dotEnvFile,
        });
    }
}

function checkEnvInfoExists() {
    readEnvFileIfExists();

    if (!process.env.SECRET)
        throw new Error("[config] - SECRET is not defined");
}

function init() {
    checkEnvInfoExists();

    module.exports = {
        secret: process.env.SECRET,
        TEST_DB: process.env.TEST_DB,
        PAYMENT_BASE_URL: "testicredit.rivhit.co.il",
        PAYMENT_PCI_BASE_URL: "testpci.rivhit.co.il",
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
    };

    switch (process.env.NODE_ENV) {
        case "production" :
        {
            console.log("Production Mode!");

            module.exports.dbUri = process.env.MONGOLAB_COPPER_URI;
            module.exports.PAYMENT_BASE_URL = "icredit.rivhit.co.il";
            module.exports.PAYMENT_PCI_BASE_URL = "pci.rivhit.co.il";
            break;
        }
        case "development" :
        {
            console.log("Development Mode!");

            // module.exports.dbUri = process.env.MONGOLAB_COPPER_URI; // Debugging production - be careful!
            module.exports.dbUri = process.env.MONGODB_URI;
            module.exports.PAYMENT_BASE_URL = "icredit.rivhit.co.il"; // TODO GoPremium should be testIcredit
            module.exports.PAYMENT_PCI_BASE_URL = "pci.rivhit.co.il";
            break;
        }
        case "test" :
        {
            console.log("Testing Mode!");

            module.exports.dbUri = process.env.TEST_URI;
            break;
        }
        default :
        {
            throw new Error("Error! No dbUri was set!");
        }
    }
}
