'use strict';
const User = require('../models/user');
const passport = require('passport');

//GET /users/{id} operationId
const getOne = (req, res) => {
    var uid = req.params.uid;
    User.getByUid(uid)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            }
            return Promise.reject("User with uid " + uid + " does not exist");
        })
        .catch((err) => res.status(404).json({message: err}))
};


//GET /users operationId
const getAll = (req, res, next) => {
    User.getAll()
        .then((users) => res.status(200).json({users: users}))
        .catch((err) => res.status(500).json({message: err}));
};

//GET /users operationId
const create = (req, res, next) => {
    User.create(req.body)
        .then((user) => res.status(200).json({user: user}))
        .catch((err) => res.status(500).json({message: err}));
};

//POST /users operationId
const save = (req, res) => {
    // Validation
    // TODO add good validations
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        // email not valid
        // passwords do not match
        return res.status(400).json({message: JSON.stringify(errors)});
    }
    else {
        // Passed
        const newUser = new User({
            uid: req.body.uid,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });

        User.getByUid(newUser.uid)
            .then((user) => {
                if (user){
                    return res.status(400).json({message: 'User with uid ' + req.body.uid + ' already exists'});
                }
            });

        User.create(newUser)
            .then((users) => res.status(200).json({success: 1, description: 'User is registered and can now login'})
                .catch((err) => res.status(400).json({message: err})));
    }
}

//PUT /users/{id} operationId
const update = (req, res) => {
    let uid = req.swagger.params.uid.value;
    let user = req.body;
    User.update(uid, user)
        .then((user) => {
            if (user) {
                res.status(200).json({success: 1, description: 'User updated'});
            }
            return Promise.reject("User with uid " + uid + " does not exist");
        })
        .catch((err) => res.status(400).json({message: err}))
}

//DELETE /users/{id} operationId
const delUser = (req, res) => {
    let uid = req.swagger.params.uid.value;
    User.delete(uid)
        .then(() => res.status(200).json({success: 1, description: 'User deleted'}))
        .catch((err) => res.status(400).json({message: err}))
}

// Exports all the functions to perform on the db
module.exports = {
    getAll,
    create,
    getOne,
    save,
    update,
    delUser
};

