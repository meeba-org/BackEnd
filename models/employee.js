const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Employee Schema
const EmployeeSchema = mongoose.Schema({
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
  /*project_ids: {
    type: [String]
  },
  roles: {
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

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.createEmployee = (newEmployee, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newEmployee.password, salt, null, (err, hash) => {
        newEmployee.password = hash;
        newEmployee.save(callback);
      });
    });
};

module.exports.getEmployeeByUid = (uid, callback) => {
  const query = {uid: uid};
  Employee.findOne(query, callback);
};

/*module.exports.getEmployeeById = (id, callback) => {
  Employee.findById(id, callback);
};*/

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
