const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = async function signUpHandler(req, res, next) {
  this.server.log.info('HTTP', 'Registering a new user')

  const User = this.server.db.sequelize.models.user

  //check email exists, and that password matches
  try {

    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if(user) {
      res.send({error: 'There is already an account registered with that email address.'})
    
    } else {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(req.body.password, salt)
      const user = await User.create({	
          firstName : req.body.firstName,
          lastName  : req.body.lastName,
          email     : req.body.email,
          password  : hash,
          role      : 'USER'
        })
      const profile = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }
      const token = jwt.sign(profile, this.server.config.get('auth:secretKey'), {expiresIn: "30m"})
      res.send({token, profile})
    }

  } catch(err) {
    if(JSON.stringify(err).indexOf('Validation') > -1) {
      this.server.log.warn('DB', 'Validation error')
      res.send({error: 'Validation Error: Please verify that you entered all the fields and that the email is properly formatted.'})
    } else {
      this.server.log.error('DB', 'Registering a new user')
      this.server.log.verbose('DB', err)
      res.send({error: 'Server error. Please try again later'})
    }
  }
}