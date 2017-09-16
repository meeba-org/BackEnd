const UserModel = require('../models/UserModel');
const CompanyModel = require('../models/CompanyModel');
const ShiftModel = require("../models/ShiftModel");

module.exports.addUser = (user) => {
    const company = user.company;
    return UserModel.createUser(user)
        .then((createdUser) => {
            if (!!company && company.id) {
                CompanyModel.addUser(company.id, createdUser);
            }
            return createdUser;
        })
};

module.exports.removeUser = (userId) => {
    return UserModel.getByUserId(userId)
        .then((user) => {
            const company = user.company;
            if (!!company && company.id)
                CompanyModel.removeUser(company.id, user);
            //ShiftModel.deleteAllShifts({user: user.id}); // Do we want to delete all user's shifts?
            return UserModel.deleteUser(user.uid);
        });
};
