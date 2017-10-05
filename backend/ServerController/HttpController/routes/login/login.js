let jwt = require('jsonwebtoken')

module.exports = async function loginHandler(req, res, next) {
  this.server.log.info('HTTP', 'User attempting to login')

  const { User } = this.server.db.sequelize.models

  //check if email already exists, and that password matches
  try {
    this.server.log.info('DB', 'User attempting to login')
    let user = await User.findOne({
      where: {email: req.body.email}
    })
    if(user) {

      if(req.body.password === user.password) {
        const token = jwt.sign({
          userId: user.id,
          name: user.fullName,
          email: user.email,
          role: user.role,
        }, this.server.config.get('auth:secretKey'), {expiresIn: "30m"})
        res.send({token})
      }
      else {
        res.send({error: 'Incorrect password. Please try again.'})
      }

    } else {
      res.send({error: 'There is no account registered with that email address. Please try again or create an account.'})
    }
  
  } catch(err) {    
    this.server.log.error('DB', 'User attempting to login')
    this.server.log.verbose('DB', err)
    res.send({error: "Server Error"})
  }
}