const mongoose = require('mongoose');

// Operation Schema
const OperationSchema = mongoose.Schema({
  uid: { // User Id
    type: String,
    index: true,
  },
  type: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  //location
});

const Operation = module.exports = mongoose.model('Operation', OperationSchema);

// Create Operation
module.exports.createOperation = (operation) => {
  return Operation.create(operation);
};

// Get Operations by Uid
module.exports.getOperationsByUid = (uid, callback, limit) => {
  const query = {uid: uid};
  Operation.find(query, callback).limit(limit);
};

// Get Status by Uid
module.exports.getStatusByUid = (uid, callback) => {
  const query = {uid: uid};
  Operation.find(query, callback).limit(1).sort({$natural:-1});
}
