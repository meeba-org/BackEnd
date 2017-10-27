const config = require("../config");
const jwt = require("jsonwebtoken");

function extractTokenFromRequest(req) {
    const authorization = req.headers['authorization'];
    if (authorization) {
        let parts = authorization.split(' ');

        if (parts.length == 2) {
            var scheme = parts[0],
                token = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                return token;
            }
        }
    }
    return req.body.token || req.query.token || req.headers['x-access-token'] || null;
}

function getUserFromToken(req) {
    const token = extractTokenFromRequest(req);
    return jwt.verify(token, config.secret);
}

function getCompanyFromLocals(res) {
    const user = res.locals.user;
    if (!user)
        throw new Error("[jwtService.getCompanyFromLocals] - user was not initialize from token in res.locals");
    return user.company;
}

module.exports = {
    extractTokenFromRequest,
    getUserFromToken,
    getCompanyFromLocals,
};
