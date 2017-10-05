// available to admin only

module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'find all timezones')
 
  const { Timezone } = this.server.db.sequelize.models.timezone

  try {
    this.server.log.info('DB', 'find all timezones')
    let timezones = await Timezone.findAll()
    res.send(timezones)
  } catch (err) {
    this.server.log.error('DB', 'find all timezones')
    this.server.log.verbose('DB', err)
    res.send([])
  }
}