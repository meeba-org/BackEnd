const express = require('express');
const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

function ensureAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
  else{
    //req.flash('error_msg', 'You are not logged in');
    res.redirect('/api/v1/users/login');
  }
}

module.exports = router;
