const express = require('express');
const router = express.Router();

const Operation = require('../models/operation');
const OperationTypes = require("../models/operationTypes");

// Clock-in / Clock-out
router.post('/', (req, res) => {
    let uid = req.body.uid;
    let type = req.body.type;

    if (!uid || !type)
        return res.status(500).json("uid or type are missing");

    var operation = {
        uid: uid,
        type: type
    };

    Operation.createOperation(operation)
        .then((operation) => {
            let isClockedIn = operation.type === OperationTypes.ClockIn;
            let lastLoggedInTime = operation.created;

            return res.status(200).json({isClockedIn: isClockedIn, lastLoggedInTime: lastLoggedInTime});
        })
        .catch((err) => {
            return res.status(500).json(err);
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
