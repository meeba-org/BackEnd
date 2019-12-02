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

const routeWrapper = async (req, res, body) => {
    const errors = validateErrors(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({message: errors.array()[0].msg});
    }

    try {
        const data = await body(req, res)
        return res.status(200).send(data);
    } catch (err) {
        let message = err.message || "Error has been thrown!";
        // eslint-disable-next-line no-console
        console.error(message);
        return res.status(err.status || 500).send({message});
    }
};

module.exports = {
    reject,
    resolve,
    routeWrapper
};
