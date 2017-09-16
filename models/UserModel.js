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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getByUserUid = (uid) => {
    return User.findOne({uid: uid}).exec();
};

module.exports.getByUserId = (id) => {
    return User.findById(id).exec();
};

// Return a promise
module.exports.getAllUsers = () => {
    return User.find().exec();
};

// Return a promise
module.exports.createUser = (user) => {
    let newUser = createUserInstance(user);

    return newUser.save();
};

module.exports.updateUser = (user) => {
    let newUser = createUserInstance(user);
    newUser._id = user._id;

    newUser = newUser.toObject();
    return User.findOneAndUpdate({'_id': newUser._id}, newUser, {upsert: true, new: true}).exec();
};

module.exports.deleteUser = (id) => {
     return User.remove({id}).exec();
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getCleanUser = (user) => {
    delete user.password;
    return user;
};

module.exports.deleteAllUsers = (conditions) => {
    if (!conditions)
        conditions = {};
    User.remove(conditions).exec();
};

module.exports.addShift = (userId, shift) => {
    return User.getById(userId)
        .then((user) => user.shifts.push(shift));
};

module.exports.removeShift = (userId, shift) => {
    return User.update( { _id: userId }, { $pull: { shifts: {_id: shift._id} } } );
};
