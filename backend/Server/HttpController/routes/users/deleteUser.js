module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'delete a user')
  
  let userId = req.params.userId
  try {
    this.server.log.info('DB', 'find user by id and delete')
    let user = await this.server.db.sequelize.models.user.findById(userId)
    await user.destroy()
    res.send({})
  } catch(err) {
    this.server.log.error('DB', 'find user by id and delete')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}