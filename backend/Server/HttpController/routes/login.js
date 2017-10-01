var express = require('express');
var router = express.Router();

// POST handle user login.
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
// POST creating a new account
router.get('/new', (req, res, next) => {
  res.send('success')
});

module.exports = router;
