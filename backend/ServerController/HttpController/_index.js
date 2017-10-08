const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const login = require('./routes/login/_index')
const users = require('./routes/users/_index')
const timezones = require('./routes/timezones/_index')

module.exports = class HttpController {
  constructor(server) {
    this.server = server
    this.app = express()

    var corsOptions = {
      origin: '*',
    };
    this.app.use(cors(corsOptions));

    this.app.use((req, res, next) => {
      this.server.log.http('', '%s %s %s', req.method, req.url, req.path)
      next()
    })
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({extended: false}))

    this.app.use('/login', login.call(this))
    this.app.use('/users', users.call(this))
    this.app.use('/timezones', timezones.call(this))

    this.httpServer = http.createServer(this.app)
  }

  async start() {
    const port = this.server.config.get('http:port')
    this.server.log.info('HTTP', 'Starting server on port ' + port)
    await this.httpServer.listen(port, ()=> this.server.log.info('HTTP', 'Listening on port ' + port))
    return Promise.resolve()
  }

  async shutdown() {
    const port = this.server.config.get('http:port')
    this.server.log.info('HTTP', 'Stopped listening on port ' + port )
    await this.httpServer.close()
    return Promise.resolve()
  }
}