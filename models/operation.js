const mongoose = require('mongoose');

// Operation Schema
const OperationSchema = mongoose.Schema({
  uid: { // User Id
    type: String,
    index: true,
    //required: true
  },
  type: {
    type: String,
    required: true
  },
  /*project_id: {
    type: String,
    required: true
  },*/
  created: {
    type: Date,
    default: Date.now
  },
  //location
});

const Operation = module.exports = mongoose.model('Operation', OperationSchema);

// Create Operation
module.exports.createOperation = (operation, callback) => {
  Operation.create(operation, callback);
};

// Get Operations by Uid
module.exports.getOperationsByUid = (uid, callback, limit) => {
  const query = {uid: uid};
  Operation.find(query, callback).limit(limit);
};

module.exports.getStatusByUid = (uid, callback) => {
  Operation.find(callback).limit(1).sort({$natural:-1});
}
