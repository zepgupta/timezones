module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'create a new user')
  
  try {
    this.server.log.info('DB', 'create user')
    let data = await this.server.db.sequelize.models.user.create({
      ...req.body 
    })
    res.send(data)
  } catch(err) {
    this.server.log.error('DB', 'create user')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}