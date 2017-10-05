module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'modify a user')

  const { User } = this.server.db.sequelize.models.user
  let userId = req.params.userId

  try {
    this.server.log.info('DB', 'finding updating user info')
    let user = await User.findById(userId)
    let resp = await user.update(Object.assign({}, user, req.body))
    res.send(resp)
  } catch(err) {
    this.server.log.error('DB', 'finding updating user info')
    this.server.log.verbose('DB', err) 
    res.send({})
  }
}