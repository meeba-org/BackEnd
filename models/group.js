const mongoose = require('mongoose');

// Group Schema
const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  project_ids: {
    type: [String]
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);

// Create Group
module.exports.createGroup = (group, callback) => {
  Group.create(group, callback);
};

// Get Groups
module.exports.getGroups = (callback, limit) => {
  Group.find(callback).limit(limit);
};

