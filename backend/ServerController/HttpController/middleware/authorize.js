const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = function(authorizedRoles = ["ADMIN"]) {
  return auth.bind(this)
  
  async function auth(req, res, next) {
    this.server.log.info('HTTP', 'Authorizing request')

    const token = req.body.token || req.query.token || req.headers['x-access-token']
    try {

      const decoded = await promisify(jwt.verify)(token, this.server.config.get('auth:secretKey'))
      if (authorizedRoles.indexOf(decoded.role) > -1) {

        if (decoded.role === "USER" && parseInt(decoded.userId) !== parseInt(req.params.userId)) {
          this.server.log.warn('MW', 'Authorizing request - User not authorized')
          res.send({error: 'User is not authorized for this request.'})
        } else {
          next()
        }
        
      } else {
        this.server.log.warn('MW', 'Authorizing request - User not authorized')
        res.send({error: 'User is not authorized for this request.'})
      }

    } catch(err) {
      this.server.log.warn('MW', 'Authorizing request - INVALID TOKEN REQUEST')
      res.send({error: 'ACCESS DENIED'})
    }
  }
}