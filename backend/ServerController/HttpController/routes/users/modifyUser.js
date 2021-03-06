module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'modify a user')

  const User = this.server.db.sequelize.models.user
  let userId = req.params.userId

  try {
    this.server.log.info('DB', 'finding updating user info')
    let user = await User.findById(userId)
    let updates = req.body
    if(user.role === 'ADMIN') {
      //prevents changing admin status
      updates.role = 'ADMIN'
    }
    await user.update(Object.assign({}, user, updates))
    user = await User.findById(userId)
    res.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    })
  } catch(err) {
    this.server.log.error('DB', 'finding updating user info')
    this.server.log.verbose('DB', err) 
    res.send({})
  }
}