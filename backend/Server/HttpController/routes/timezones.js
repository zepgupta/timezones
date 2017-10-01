var express = require('express')
var router = express.Router()

module.exports = function() {
  /* GET all timezones by user */
  router.get('/', async (req, res, next) => {
    // available to admin only
    let timezones = await this.server.db.sequelize.models.timezone.findAll()
    res.send(timezones)
  })
  // GET all timezones for the specified user
  router.get('/:userId', async (req, res, next) => {
    let userId = req.params.userId
    let timezones = await this.server.db.sequelize.models.timezone.findAll({ where: { userId: userId}})
    res.send(timezones)
    // if user, verify userId matches id in jwt
  })
  // POST create new timezone for a specific user
  router.post('/:userId', async (req, res, next) => {
    let userId = req.params.userId
    let timezone = await this.server.db.sequelize.models.timezone.create({
      name: 'timezone',
      city: 'Hong Kong',
      timezone: 'central',
      offset: -3,
      userId: userId
    })
    res.send(timezone)
    //only for user and admin
  })
  // DELETE a specific timezone for a specific user. user or admin
  router.delete('/:userId/:tzId', async (req, res, next) => {
    let userId = req.params.user
    let tzId = req.params.tzId // timezone id
    let timezone = await this.server.db.sequelize.models.timezone.findById(tzId)
    let resp = await timezone.destroy()
    res.send(resp)
    // make sure userId matches jwt for user
  })
  // PUT modify an existing timezone. admin and user only
  router.put('/:user/:id', async (req, res, next) => {
    let userId = req.params.user
    let tzId = req.params.id // timezone id
    let timezone = await this.server.db.sequelize.models.timezone.findById(tzId)
    let resp = await timezone.update({ city: "Los Angeles" })
    res.send(resp)
    //modify the existing timezone
  })

  return router
}