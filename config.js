const mongoose = require('mongoose');
const fs = require('fs');
const dotEnvFile = '.env';

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development'

if (!module.exports.dbUrl)
    init();

function init() {
    if (fs.existsSync(dotEnvFile)) {
        require('dotenv').config({
            path: dotEnvFile,
        });
    }

    module.exports.secret = process.env.SECRET;
    module.exports.TEST_DB = process.env.TEST_DB;
    module.exports.DB_USER = process.env.DB_USER;
    module.exports.DB_PASS= process.env.DB_PASS;
    mongoose.Promise = global.Promise;

    switch (process.env.NODE_ENV) {
        case "production" :
        {
            console.log("Production Mode!")

            module.exports.dbUrl = process.env.PRODUCTION_DB;
            break;
        }
        case "development" :
        {
            console.log("Development Mode!");

            module.exports.dbUrl = process.env.DEVELOPMENT_DB;
            break;
        }
        case "test" :
        {
            console.log("Testing Mode!")

            module.exports.dbUrl = TEST_DB;
            break;
        }
        default :
        {
            console.log("Error! No Mode was set!")
        }
    }
}
