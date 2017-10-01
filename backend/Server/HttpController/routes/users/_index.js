var express = require('express')
var router = express.Router()

const getUsers = require('./getUsers');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const modifyUser = require('./modifyUser');

module.exports = function() {

  router.get('/', getUsers.bind(this))

  router.post('/', createUser.bind(this))

  router.delete('/:userId', deleteUser.bind(this))

  router.put('/:user', modifyUser.bind(this))


  return router
}