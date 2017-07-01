const express = require('express');
const router = express.Router();

const Operation = require('../models/operation');

// Clock-in / Clock-out
router.post('/', (req, res) => {
  var operation = req.body;
  operation.uid = req.user.uid;
  Operation.createOperation(operation, (err, operation) => {
    if (err) throw err;
    req.flash('success_msg', 'Operation was recorded successfully: ' + operation);
    res.redirect('/api/v1');
    //res.json(operation);
  });
});

// Get logged-in User operations
router.get('/', (req, res) => {
  var uid = req.user.uid;
  Operation.getOperationsByUid(uid, (err, operations) => {
    if (err) throw err;
    if (!operations || operations.length == 0){
      req.flash('success_msg', 'No status recorded');
      res.redirect('/api/v1');
    }
    else
    {
      Operation.getStatusByUid(uid, (err, status) => {
        if (err) throw err;
        var type = status[0].type;
        req.flash('success_msg', 'Your last operations were: ' + operations + ' so, your status is: ' + type);
        res.redirect('/api/v1');
      });
    }
    //res.json(operations);
  });
});

// Get specific User operations
router.get('/:uid', (req, res) => {
  var uid = req.params.uid;
  Operation.getOperationsByUid(uid, (err, operations) => {
    if (err) throw err;
    res.json(operations);
  });
});

module.exports = router;
