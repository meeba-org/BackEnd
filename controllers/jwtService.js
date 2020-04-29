const config = require("../config");
const jwt = require("jsonwebtoken");
const {fbAdmin} = require('../managers/FirebaseManager');
const UserModel = require('../models/UserModel');

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

const getDecodedIdTokenFromReq = async req => {
    const idToken = extractTokenFromRequest(req);
    if (!idToken)
        throw new Error("[jwtService.getUserFromToken] - idToken could not extracted from request");

    return await fbAdmin.auth().verifyIdToken(idToken);
};

const getFbUidFromToken = async req => {
    const decodedIdToken = await getDecodedIdTokenFromReq(req);
    return decodedIdToken.uid;
};

const getUserFromToken = async req => {
    const fbUid = await getFbUidFromToken(req);
    return UserModel.getUserByFbUid(fbUid);
};

function getUserFromLocals(res) {
    const user = res.locals.user;
    if (!user)
        throw new Error("[jwtService.getCompanyFromLocals] - user was not initialize from token in res.locals");
    return user;
}

function getCompanyFromLocals(res) {
    const user = getUserFromLocals(res);
    return user.company;
}

function isUserIdValid(userId, req) {
    let user = getUserFromToken(req);
    return user._id === userId;
}

module.exports = {
    extractTokenFromRequest,
    getUserFromToken,
    getCompanyFromLocals,
    getUserFromLocals,
    isUserIdValid,
    getFbUidFromToken,
    getDecodedIdTokenFromReq,
};
