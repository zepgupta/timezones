var express = require('express')
var router = express.Router()

const auth = require('../../middleware/authorize')

const getUsers = require('./getUsers');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const modifyUser = require('./modifyUser');

module.exports = function() {
  const authorize = auth.bind(this)

  router.get('/', // get all users
    authorize(['USERMANAGER','ADMIN']), 
    getUsers.bind(this))

  router.post('/', // create a user manually
    authorize(['USERMANAGER','ADMIN']), 
    createUser.bind(this))

  router.delete('/:userId', // delete a user
    authorize(['USERMANAGER','ADMIN']), 
    deleteUser.bind(this))

  router.put('/:userId', // modify a user
    authorize(['USER','USERMANAGER','ADMIN']), 
    modifyUser.bind(this))


  return router
}