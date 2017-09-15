'use strict';
const UserModel = require('../models/UserModel');
const express = require('express');
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
    // req.checkBody('uid', 'uid is required').notEmpty();
    // req.checkBody('first_name', 'First name is required').notEmpty();
    // req.checkBody('last_name', 'Last name is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('role', 'Role is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            UserModel.createUser(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

//PUT /users user
router.put('/', (req, res) => {
    // req.checkBody('_id', '_id is required').notEmpty();
    // req.checkBody('uid', 'uid is required').notEmpty();
    // req.checkBody('first_name', 'First name is required').notEmpty();
    // req.checkBody('last_name', 'Last name is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('password', 'Password is required').notEmpty();
    // req.checkBody('role', 'Role is required').notEmpty();

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

            return UserModel.deleteUser(uid)
                .then(() => {
                    return res.status(204).send();
                })
                .catch((err) => {
                    return res.status(500).json({message: err});
                });
        })
        .catch((err) => res.status(400).json({message: err.array()}));
});

module.exports = router;
