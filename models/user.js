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

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create = (newUser, callback) => {
  //TODO remove next line when bcrypt is fixed
  newUser.save(callback);
  /*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, null, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });*/
};

module.exports.getByUid = (uid) => {
  const query = {uid: uid};
  return User.findOne(query);
};

module.exports.getById = (id, callback) => {
 User.findById(id, callback);
};

// Return a promise
module.exports.getAll = () => {
  return User.find().exec();
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
