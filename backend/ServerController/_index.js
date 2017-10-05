const nconf = require('nconf')
const log = require('npmlog')

const HttpController = require('./HttpController/_index')
const DbController   = require('./DbController/_index')
const ApiController  = require('./ApiController/_index')

const seed = require('./seed')

module.exports = class Server {
  constructor(defaultConfig) {
    this.config = new nconf.Provider()
    this.config.argv().env().defaults(defaultConfig)
   
    this.log = log
    this.log.level = this.config.get('log:level')

    this.http = new HttpController(this)
    this.db = new DbController(this)
    this.api = new ApiController(this)

    this.seed = seed.bind(this)
  }

  async start() {
    this.log.info('SERVER', 'STARTING');
    //return 
    await Promise.all([
      this.db.start(),
      this.http.start(),
      this.api.start()
    ])

    await this.seed();
  }

  shutdown() {
    this.log.info('SERVER', 'SHUTTING DOWN')
    return Promise.all([
      this.http.shutdown(),
      this.db.shutdown(),
      this.api.shutdown()
    ])
  }
}