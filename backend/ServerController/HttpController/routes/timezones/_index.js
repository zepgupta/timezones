var express = require('express')
var router = express.Router()

const auth = require('../../middleware/authorize')
const cache = require('../../middleware/cache')

const getTimezones_all = require('./getTimezones_all')
const getTimezones_user = require('./getTimezones_user')
const createTimezone = require('./createTimezone')
const deleteTimezone = require('./deleteTimezone')
const modifyTimezone = require('./modifyTimezone')

module.exports = function() {
  const authorize = auth.bind(this)
  
  router.get('/', // get all timezones for all users
    authorize(['ADMIN']),
    cache(this.server.config.get('cache')),
    getTimezones_all.bind(this))

  router.get('/:userId', // get all timezones for the specified user
    authorize(['USER','ADMIN']),
    cache(this.server.config.get('cache')),
    getTimezones_user.bind(this))

  router.post('/:userId', // create a timezone
    authorize(['USER','ADMIN']),
    createTimezone.bind(this))

  router.delete('/:userId/:tzId', // delete a timezone
    authorize(['USER','ADMIN']),
    deleteTimezone.bind(this))

  router.put('/:userId/:tzId', // modify a timezone
    authorize(['USER','ADMIN']),
    modifyTimezone.bind(this))

  return router
}