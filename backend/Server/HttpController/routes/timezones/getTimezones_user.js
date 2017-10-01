// available to user and admin
module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'find all timezones for a specific user')

  let userId = req.params.userId
  try {
    let timezones = await this.server.db.sequelize.models.timezone.findAll({ where : { userId : userId }})
    res.send(timezones)
  } catch(err) {
    this.server.log.error('DB', 'find all timezones for a specific user')
    this.server.log.verbose('DB', err)
    res.send([])
  }
  
}