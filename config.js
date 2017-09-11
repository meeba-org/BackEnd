
var TEST_DB_URL = "";
var PRODUCTION_DB = "mongodb://admin:admin12@ds139242.mlab.com:39242/heroku_9mpwf6zf";

var DEVELOPMENT_ADDRESS = 'http://localhost:3000';

if (!module.exports.dbUrl)
    init();

function init() {
    module.exports.secret = 'bohemian-rhapsody';
    module.exports.TEST_DB_URL = TEST_DB_URL;

    switch (process.env.NODE_ENV) {
        case "production" :
        {
            console.log("Production Mode!")

            module.exports.dbUrl = PRODUCTION_DB;
            // module.exports.baseUrl = PRODUCTION_ADDRESS;
            break;
        }
        case "development" :
        {
            console.log("Development Mode!");

            module.exports.dbUrl = PRODUCTION_DB;
            module.exports.baseUrl = DEVELOPMENT_ADDRESS;
            break;
        }
        case "test" :
        {
            console.log("Testing Mode!")

            module.exports.dbUrl = TEST_DB_URL;
            break;
        }
        default :
        {
            console.log("Error! No Mode was set!")
        }
    }
}
