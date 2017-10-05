let jwt = require('jsonwebtoken')

module.exports = async function signUpHandler(req, res, next) {
  this.server.log.info('HTTP', 'Registering a new user')

  const { User } = this.server.db.sequelize.models.user

  //check email exists, and that password matches
  try {

    let user = await User.findOne({
      where: {email: req.body.email}
    })
    if(user) {
      res.send({error: 'There is already an account registered with that email address.'})
    
    } else {
      let user = await User.create({	
          firstName : req.body.firstName,
          lastName  : req.body.lastName,
          email     : req.body.email,
          password  : req.body.password,
          role      : req.body.role
        })
      const token = jwt.sign({
          userId: user.id,
          name: user.fullName,
          email: user.email,
          role: user.role,
        }, this.server.config.get('auth:secretKey'), {expiresIn: "30m"})
      res.send({token})
    }

  } catch(err) {    
    this.server.log.error('DB', 'User attempting to login')
    this.server.log.verbose('DB', err)
    res.send({error: 'Server error.'})
  }
}