const { validationResult } = require('express-validator/check');

function validateErrors(req) {
    return validationResult(req);
}

function reject(message, status) {
    return Promise.reject({
        message,
        status: status || 500
    });
}

function resolve(data) {
    return Promise.resolve(data);
}

function routeWrapper(req, res, body) {
    const errors = validateErrors(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message: errors.array()[0].msg});
    }

    try {
        return body(req, res)
            .then((data) => {
                return res.status(200).send(data);
            })
            .catch((err) =>{
                let message = err.message || "Error has occurred in async operation!";
                console.error(message);
                return res.status(err.status || 500).send({message});
            });
    }
    catch (err) {
        let message = err.message || "Error has been thrown!";
        console.error(message);
        return res.status(err.status || 500).send({message});
    }
}

module.exports = {
    validateErrors,
    reject,
    resolve,
    routeWrapper
};
