const { validationResult } = require('express-validator/check');

function validateErrors(req) {
    return validationResult(req);
}

module.exports = {
    validateErrors
};
