var express = require('express');
var router = express.Router();

const login = require('./login')
const signUp = require('./signUp')

module.exports = function() {
  
  router.post('/', login.bind(this));

  router.post('/new', signUp.bind(this));

  return router
}

