const UserModel = require('../models/UserModel');
const CompanyModel = require('../models/CompanyModel');
const ShiftModel = require("../models/ShiftModel");

module.exports.addUser = (user) => {
    const company = user.company;
    CompanyModel.addUser(company.id, user);
    return UserModel.createUser(user);
};

module.exports.removeUser = (userId) => {
    return UserModel.getByUserId(userId)
        .then((user) => {
            const company = user.company;
            CompanyModel.removeUser(company.id, user);
            //ShiftModel.deleteAllShifts({user: user.id}); // Do we want to delete all user's shifts?
            return UserModel.deleteUser(user.uid);
        });
};
