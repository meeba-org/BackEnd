'use strict';
const User = require('../models/user');

//GET /users/{uid} user
const getByUid = (req, res) => {
    req.checkParams('uid', 'uid is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();

            const uid = req.params.uid;

            User.getByUid(uid)
                .then((user) => {
                    if (user)
                        return res.status(200).json(user);
                    return Promise.reject("User with uid " + uid + " does not exist");
                })
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
};

//GET /users users
const getAll = (req, res) => {
    User.getAll()
        .then((users) => res.status(200).json({users: users}))
        .catch((err) => res.status(500).json({message: err}));
};

//POST /users user
const create = (req, res) => {
    req.checkBody('uid', 'uid is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            User.create(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
};

//PUT /users user
const update = (req, res) => {
    req.checkBody('_id', '_id is required').notEmpty();
    req.checkBody('uid', 'uid is required').notEmpty();
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('role', 'Role is required').notEmpty();

    req.getValidationResult()
        .then(function (result) {
            result.throw();
            User.update(req.body)
                .then((user) => res.status(200).json({user: user}))
                .catch((err) => res.status(500).json({message: err}));
        })
        .catch((err) => res.status(400).json({message: err.array()}));
};

//DELETE /users/{id} userUid
const delUser = (req, res) => {
    req.checkParams('uid', 'int uid is required').notEmpty().isInt();

    return req.getValidationResult()
        .then(function (result) {
            result.throw();

            const uid = req.params.uid;

            return User.delUser(uid)
                .then(() => {
                    return res.status(204).send();
                })
                .catch((err) => {
                    return res.status(500).json({message: err});
                });
        })
        .catch((err) => res.status(400).json({message: err.array()}));
};

// Exports all the functions to perform on the db
module.exports = {
    getAll,
    getByUid,
    create,
    update,
    delUser
};

