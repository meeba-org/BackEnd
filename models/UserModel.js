const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        index: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }],
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

function createUserInstance(user) {
    let newUser = new User();
    Object.assign(newUser, user);
    return newUser;
}

const User = mongoose.model('User', UserSchema);

const getByUserUid = (uid) => {
    return User.findOne({uid: uid}).exec();
};

const getByUserId = (id) => {
    return User.findById(id).populate('company shifts').exec();
};

// Return a promise
const getAllUsers = () => {
    return User.find().exec();
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
    return User.findOneAndUpdate({'_id': newUser._id}, newUser, {upsert: true, new: true}).exec();
};

const deleteUser = (id) => {
     return User.findByIdAndRemove(id).exec();
};

const comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
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

const usersCount = () => User.count().exec();

module.exports = {
    createUser
    , getByUserId
    , getAllUsers
    , updateUser
    , deleteUser
    , deleteAllUsers
    , addShift
    , removeShift
    , deleteAllUsers
    , usersCount
};
