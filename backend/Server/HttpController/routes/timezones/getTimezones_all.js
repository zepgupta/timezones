// available to admin only

module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'find all timezones')
 
  try {
    let timezones = await this.server.db.sequelize.models.timezone.findAll()
    res.send(timezones)
  } catch (err) {
    this.server.log.error('DB', 'find all timezones')
    this.server.log.verbose('DB', err)
    res.send([])
  }
}