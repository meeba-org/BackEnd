const express = require('express');
const router = express.Router();

const Group = require('../models/group');

router.post('/', (req, res) => {
  var group = req.body;
  Group.createGroup(group, (err, group) => {
    if (err) throw err;
    res.json(group);
  });
});

router.get('/', (req, res) => {
  Group.getGroups((err, groups) => {
    if (err) throw err;
    res.json(groups);
  });
});

module.exports = router;
