const { validationResult } = require('express-validator/check');

function validateErrors(req) {
    return validationResult(req);
}

function reject(message) {
    return Promise.reject({message});
}

function routeWrapper(req, res, body) {
    const errors = validateErrors(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    try {
        return body(req, res)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json({message: err.message}));
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = {
    validateErrors,
    reject,
    routeWrapper
};
