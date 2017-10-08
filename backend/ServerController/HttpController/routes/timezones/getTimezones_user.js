// available to user and admin
module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'find all timezones for a specific user')

  const Timezone = this.server.db.sequelize.models.timezone
  const userId = req.params.userId
  
  try {
    this.server.log.info('DB', 'find all timezones for a specific user')
    let timezones = await Timezone.findAll({ where : { userId : userId }})
    res.send(timezones)
  } catch(err) {
    this.server.log.error('DB', 'find all timezones for a specific user')
    this.server.log.verbose('DB', err)
    res.send([])
  }
  
}