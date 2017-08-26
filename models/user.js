const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
    uid: {
        type: String,
        index: true,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        //required: true
    },
    role: {
        type: String,
        required: true
    },
    /*
     project_ids: {
     type: [String]
     },
     created: {
     type: Date,
     default: Date.now
     },
     updated: {
     type: Date,
     default: Date.now
     }*/
});

function createUserInstance(user) {
    let newUser = new User();
    newUser.uid = user.uid;
    newUser.first_name = user.first_name;
    newUser.last_name = user.last_name;
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.role = user.role;
    return newUser;
}

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getByUid = (uid) => {
    return User.findOne({uid: uid});
};

module.exports.getById = (id, callback) => {
    User.findById(id, callback);
};

// Return a promise
module.exports.getAll = () => {
    return User.find().exec();
};

// Return a promise
module.exports.create = (user) => {
    let newUser = createUserInstance(user);

    return newUser.save();
};

module.exports.update = (user) => {
    let newUser = createUserInstance(user);
    newUser._id = user._id;

    newUser = newUser.toObject();
    return User.findOneAndUpdate({'_id': newUser._id}, newUser, {upsert: true, new: true}).exec();
};

module.exports.delUser = (uid) => {
     return User.remove({uid: uid}).exec();
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};
