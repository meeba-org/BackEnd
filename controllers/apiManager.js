const { validationResult } = require('express-validator/check');

function validateErrors(req) {
    return validationResult(req);
}

function reject(message, status) {
    return Promise.reject({
        message,
        status: status
    });
}

function resolve(data) {
    return Promise.resolve(data);
}

function routeWrapper(req, res, body) {
    const errors = validateErrors(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    try {
        return body(req, res)
            .then((data) => {
                return res.status(200).send(data)
            })
            .catch((err) =>{
                return res.status(err.status || 500).send({message: err.message || "Error has occurred in async operation!"});
            });
    }
    catch (err) {
        return res.status(err.status || 500).send({message: err.message || "Error has been thrown!"});
    }
}

module.exports = {
    validateErrors,
    reject,
    resolve,
    routeWrapper
};
