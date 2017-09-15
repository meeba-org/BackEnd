'use strict';
const UserModel = require('../models/UserModel');
const express = require('express');
const UsersManager = require("../managers/UsersManager");
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
    UserModel.getAllUsers()
        .then((users) => res.status(200).json({users: users}))
        .catch((err) => res.status(500).json({message: err}));
});

//POST /users user
router.post('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            UsersManager.addUser(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /users user
router.put('/', (req, res) => {

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            UserModel.updateUser(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//DELETE /users/{id} userUid
router.delete('/:uid', (req, res) => {
    req.checkParams('uid', 'int uid is required').notEmpty().isInt();

    return req.getValidationResult()
        .then(function (result) {
            result.throw();

            const uid = req.params.uid;

            return UsersManager.removeUser(uid)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
