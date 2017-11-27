const mongoose = require('mongoose');
const fs = require('fs');
const dotEnvFile = '.env';

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development'

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
        throw new Error("[config] - SECERT is not defined");

    if (!process.env.TEST_DB)
        throw new Error("[config] - TEST_DB is not defined");

    if (!process.env.DB_USER)
        throw new Error("[config] - DB_USER is not defined");

    if (!process.env.DB_PASS)
        throw new Error("[config] - DB_PASS is not defined");
};

function init() {
    checkEnvInfoExists();

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

            module.exports.dbUrl = process.env.TEST_DB;
            break;
        }
        default :
        {
            throw new Error("Error! No dbUrl was set!")
        }
    }
}
