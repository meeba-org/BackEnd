const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ERoles = require("./ERoles");
const ETransportPaymentPer = require("./ETransportPaymentPer");

// User Schema
const UserSchema = mongoose.Schema({
    uid: { type: String, index: true },
    // fbUid: { type: String },
    fullName: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    hourWage: {type: Number, default: 29.12 },
    transportation: {type: Number, default: 11.8 },
    transportPaymentPer: {type: Number, default: ETransportPaymentPer.SHIFT },
    role: { type: String, default: ERoles.EMPLOYEE},
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    deleted: {type: Boolean, default: false},
});

function createUserInstance(user) {
    let newUser = new User();
    Object.assign(newUser, user);
    return newUser;
}

const User = mongoose.model('User', UserSchema);

const getByUserUid = (uid, shouldPopulateCompany) => {
    let query = User.findOne({uid: uid});

    if (shouldPopulateCompany)
        query = query.populate('company');

    return query.exec();
};

const getByUserId = (id) => {
    return User.findById(id).populate('company shifts').exec();
};

const getByUserName = (username) => {
    return User.findOne({username}).populate('company').exec();
};

const getByEmail = (email) => {
    return User.findOne({email}).populate('company').exec();
};

const getUserByFbUid = (fbUid) => {
    return User.findOne({fbUid}).populate('company').exec();
};

const getByUserIdentifier = async (identifier) => {
    let user = await getByUserName(identifier);
    if (user)
        return user;
    
    user = await getByEmail(identifier);
    if (user)
        return user;

    return getByUserUid(identifier, true);
};

// Return a promise
const getUsers = (company, hideDeleted) => {
    if (!company || !company._id)
        throw new Error('[UserModel.getUsers] - No Valid company object');

    let conditions = {company: company._id, role: {'$ne':ERoles.COMPANY_MANAGER}};

    if (!!hideDeleted)
        conditions.deleted = false; // get users that are not deleted

    return User.find(conditions).exec();
};

// Return a promise
const createUser = (user) => {
    let newUser = createUserInstance(user);

    return newUser.save();
};

const updateUser = (user) => {
    let newUser = createUserInstance(user);
    newUser._id = user._id;

    newUser = newUser.toObject();
    return User.findOneAndUpdate({'_id': newUser._id}, newUser, {upsert: true, new: true}).populate('company').exec();
};

const deleteUser = (id) => {
    return User.findOneAndUpdate({'_id': id}, {deleted: true}).exec();
};

const comparePassword = (candidatePassword, password, callback) => {
    return candidatePassword === password;
    // bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    //     if (err) throw err;
    //     callback(null, isMatch);
    // });
};

const getCleanUser = (user) => {
    delete user.password;
    return user;
};

const deleteAllUsers = (conditions) => {
    if (!conditions)
        conditions = {};
    return User.remove(conditions).exec();
};

const addShift = (userId, shift) => {
    return User.findByIdAndUpdate(userId, {$push: {"shifts": shift.toObject()}}, {new : true});
};

const removeShift = (userId, shift) => {
    return User.findByIdAndUpdate(userId, { $pull: { "shifts": shift.id} }, {'new': true} );
};

const usersCount = (ignoreDeleted) => {
    let conditions = {};

    if (ignoreDeleted)
        conditions.deleted = false;

    return User.countDocuments(conditions).exec();
};

const isEmployee = (user) => user.role === ERoles.EMPLOYEE;

const isCompanyManager = (user) => user.role === ERoles.COMPANY_MANAGER;

module.exports = {
    createUser
    , getByUserId
    , getByUserUid
    , getByUserName
    , getUsers
    , updateUser
    , deleteUser
    , deleteAllUsers
    , addShift
    , removeShift
    , usersCount
    , comparePassword
    , getCleanUser
    , isEmployee
    , isCompanyManager
    , getByUserIdentifier
    , getUserByFbUid
};
