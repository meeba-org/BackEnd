const express = require('express');
const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  res.json('Hi this is Meeba!');
});

module.exports = router;
