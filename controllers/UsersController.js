'use strict';
const UserModel = require('../models/UserModel');
const express = require('express');
const AppManager = require("../managers/AppManager");
const jwtService = require("./jwtService");
const router = express.Router();

//GET /users/{uid} user
router.get('/:uid', (req, res) => {
    req.checkParams('uid', 'uid is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const uid = req.params.uid;

            UserModel.getByUserUid(uid)
                .then((user) => {
                    if (user)
                        return res.status(200).json(user);
                    return Promise.reject("User with uid " + uid + " does not exist");
                })
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//GET /users users
router.get('/', (req, res) => {
    let company = jwtService.getCompanyFromLocals(res);

    UserModel.getUsers(company)
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json({message: err}));
});

//POST /users user
router.post('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let user = req.body;
            const companyFromToken = jwtService.getCompanyFromLocals(res);
            user.company = companyFromToken._id;

            AppManager.addUser(user)
                .then((user) => res.status(200).json(user))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /users user
router.put('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            let user = req.body;
            const companyFromToken = jwtService.getCompanyFromLocals(res);
            user.company = companyFromToken._id;

            UserModel.updateUser(user)
                .then((user) => res.status(200).json(user))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//DELETE /users/{id} userUid
router.delete('/:id', (req, res) => {
    req.checkParams('id', 'int id is required').notEmpty();

    return req.getValidationResult()
        .then(function (result) {
            result.throw();

            const id = req.params.id;

            return AppManager.removeUser(id)
                .then(() => res.status(200).send(id))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
