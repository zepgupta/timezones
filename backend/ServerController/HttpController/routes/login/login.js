let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')

module.exports = async function loginHandler(req, res, next) {
  this.server.log.info('HTTP', 'User attempting to login')

  const User = this.server.db.sequelize.models.user

  //check if email already exists, and that password matches
  try {
    this.server.log.info('DB', 'User attempting to login')
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if(user) {
      // allows direct matches only to allow originally seeded models to be queried, and because 
      // the app creates new users as "USERS" by default
      const match = await req.body.password === user.password ? 
        true : bcrypt.compare(req.body.password, user.password)
      if(match) {
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