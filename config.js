const fs = require('fs');
const dotEnvFile = '.env';

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development';

if (!module.exports.dbUrl)
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

    if (!process.env.DB_USER)
        throw new Error("[config] - DB_USER is not defined");

    if (!process.env.DB_PASS)
        throw new Error("[config] - DB_PASS is not defined");
}

function init() {
    if (process.env.NODE_ENV !== 'test')
        checkEnvInfoExists();

    module.exports = {
        secret: process.env.SECRET,
        TEST_DB: process.env.TEST_DB,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        PAYMENT_BASE_URL: "testicredit.rivhit.co.il",
        PAYMENT_PCI_BASE_URL: "testpci.rivhit.co.il",
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
    };

    switch (process.env.NODE_ENV) {
        case "production" :
        {
            console.log("Production Mode!");

            module.exports.dbUrl = process.env.MONGOLAB_COPPER_URI;
            module.exports.PAYMENT_BASE_URL = "icredit.rivhit.co.il";
            module.exports.PAYMENT_PCI_BASE_URL = "pci.rivhit.co.il";
            break;
        }
        case "development" :
        {
            console.log("Development Mode!");

            module.exports.dbUrl = process.env.MONGODB_URI;
            module.exports.PAYMENT_BASE_URL = "icredit.rivhit.co.il"; // TODO GoPremium should be testIcredit
            module.exports.PAYMENT_PCI_BASE_URL = "pci.rivhit.co.il";
            break;
        }
        case "test" :
        {
            console.log("Testing Mode!");

            /**
             * Ugly hack - cant extract the process.env.TEST_DB in test phase in heroku
             * Check more details in here: https://stackoverflow.com/questions/19570064/process-env-does-not-contain-config-variables-on-heroku/47513032#47513032
             *
             * So I'm exposing credential here but its ok - only test db
             * @type {string}
             */
            module.exports.dbUrl = "mongodb://admin:admin12@ds135594.mlab.com:35594/heroku_l3mnf6v2";
            module.exports.TEST_DB = "mongodb://admin:admin12@ds135594.mlab.com:35594/heroku_l3mnf6v2";
            break;
        }
        default :
        {
            throw new Error("Error! No dbUrl was set!");
        }
    }
}
