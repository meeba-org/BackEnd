const mongoose = require('mongoose');

var TEST_DB = "mongodb://admin:admin12@ds135594.mlab.com:35594/heroku_l3mnf6v2";
var DEVELOPMENT_DB = "mongodb://admin:admin12@ds139242.mlab.com:39242/heroku_9mpwf6zf";
var PRODUCTION_DB = "mongodb://admin:admin12@ds121906.mlab.com:21906/heroku_72bs9k0z";

if (!process.env.NODE_ENV)
    process.env.NODE_ENV = 'development'

if (!module.exports.dbUrl)
    init();

function init() {
    module.exports.secret = 'bohemian-rhapsody';
    module.exports.TEST_DB = TEST_DB;
    mongoose.Promise = global.Promise;

    switch (process.env.NODE_ENV) {
        case "production" :
        {
            console.log("Production Mode!")

            module.exports.dbUrl = PRODUCTION_DB;
            break;
        }
        case "development" :
        {
            console.log("Development Mode!");

            module.exports.dbUrl = DEVELOPMENT_DB;
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
