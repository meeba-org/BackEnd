const express = require('express');
const router = express.Router();

const Operation = require('../models/operation');
const OperationTypes = require("../models/operationTypes");

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
      return res.status(200).json({isClockedIn: false, lastLoggedInTime: null}); // No operations found --> status is clock-out
    }
    Operation.getStatusByUid(uid, (err, status) => {
      if (err) throw err;
      let isClockedIn = status[0].type === OperationTypes.ClockIn;
      let lastLoggedInTime = status[0].created;

      return res.status(200).json({isClockedIn: isClockedIn, lastLoggedInTime: lastLoggedInTime});
    });
  });
});

module.exports = router;
