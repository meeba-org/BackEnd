'use strict';
const UserModel = require('../models/UserModel');
const express = require('express');
const AppManager = require("../managers/AppManager");
const jwtService = require("./jwtService");
const {reject, resolve} = require("./apiManager");
const router = express.Router();
const routeWrapper = require("./apiManager").routeWrapper;
const {param} = require('express-validator/check');

//GET /users/{uid} user
router.get('/:uid',
    [
        param('uid').exists()
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const uid = req.params.uid;

        return UserModel.getByUserUid(uid)
            .then((user) => {
                if (user)
                    return resolve(user);
                return reject("User with uid " + uid + " does not exist", 400);
            });
    })
);

//GET /users users
router.get('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let company = jwtService.getCompanyFromLocals(res);
        let hideDeleted = req.query.hideDeleted;

        return UserModel.getUsers(company, hideDeleted);
    })
);

//POST /users user
router.post('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let user = req.body;
        const companyFromToken = jwtService.getCompanyFromLocals(res);
        user.company = companyFromToken._id;

        return AppManager.addUser(user);
    })
);

//PUT /users user
router.put('/',
    (req, res) => routeWrapper(req, res, (req, res) => {
        let user = req.body;
        const companyFromToken = jwtService.getCompanyFromLocals(res);
        user.company = companyFromToken._id;

        return AppManager.isUserWithSameUidAlreadyExist(user)
            .then(isUserExist => {
                if (isUserExist)
                    throw new Error('משתמש עם תז זו כבר קיים');
                else
                    return UserModel.updateUser(user);
            });
    })
);

//DELETE /users/{id} userUid
router.delete('/:id',
    [
        param('id').exists()
    ],
    (req, res) => routeWrapper(req, res, (req, res) => {
        const id = req.params.id;

        return AppManager.removeUser(id)
            .then(() => id);
    })
);

module.exports = router;
