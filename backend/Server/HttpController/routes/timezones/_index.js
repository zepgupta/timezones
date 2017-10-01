var express = require('express')
var router = express.Router()

const getTimezones_all = require('./getTimezones_all');
const getTimezones_user = require('./getTimezones_user');
const createTimezone = require('./createTimezone');
const deleteTimezone = require('./deleteTimezone');
const modifyTimezone = require('./modifyTimezone');

module.exports = function() {

  router.get('/', getTimezones_all.bind(this))

  router.get('/:userId', getTimezones_user.bind(this))

  router.post('/:userId', createTimezone.bind(this))

  router.delete('/:userId/:tzId', deleteTimezone.bind(this))

  router.put('/:user/:tzId', modifyTimezone.bind(this))

  return router
}