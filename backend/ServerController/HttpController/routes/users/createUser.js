module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'create a new user')
  
  const { User } = this.server.db.sequelize.models.User

  try {
    this.server.log.info('DB', 'create user')
    let user = await User.findOne({
      where: { email: req.body.email }
    })
    if (user) {
      this.server.log.info('HTTP', 'create user - email already registered')
      res.send({error: "An account already exists with that email"})
    } else {
      this.server.log.info('HTTP', 'create user - success')
      let data = await User.create(req.body)
      res.send(data)
    }
  } catch(err) {
    this.server.log.error('DB', 'create user - database error')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}