module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'delete a user')

  const User = this.server.db.sequelize.models.user
  const Timezone = this.server.db.sequelize.models.timezone
  let userId = req.params.userId
  
  try {
    this.server.log.info('DB', 'find user by id and delete')
    await Timezone.destroy({where: {userId: userId}})
    let user = await User.findById(userId)
    await user.destroy()
    res.send({})
  } catch(err) {
    this.server.log.error('DB', 'find user by id and delete')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}