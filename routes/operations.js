const express = require('express');
const router = express.Router();

const Operation = require('../models/operation');

// Clock-in / Clock-out
router.post('/', (req, res) => {
  var operation = {
    uid: req.body.uid,
    type: req.body.type
  }
  Operation.create(operation, (err, operation) => {
    if (err) throw err;
    return res.status(200).json({message: "Operation was recorded successfully", operation: operation});
  });
});

// Get User status & operations
router.get('/:uid', (req, res) => {
  var uid = req.params.uid;
  Operation.getOperationsByUid(uid, (err, operations) => {
    if (err) throw err;
    if (!operations || operations.length == 0){
      return res.status(401).json({message: "No operation found"});
    }
    Operation.getStatusByUid(uid, (err, status) => {
      if (err) throw err;
      var type = status[0].type;
      return res.status(200).json({status: type, operations: operations});
    });
  });
});

module.exports = router;
