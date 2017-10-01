module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'get all users')
  
  try {
    this.server.log.info('DB', 'find all users')
    let data = await this.server.db.sequelize.models.user.findAll()
    res.send(data)
  } catch(err) {
    this.server.log.error('DB', 'find all users')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}