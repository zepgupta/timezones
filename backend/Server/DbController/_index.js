const Sequelize = require('sequelize')
const { Client } = require('pg')

const defineSchema = require('./schema')
const {connectToPostgres, createDatabase, connectToDatabase} = require('./startupFns')

module.exports = class DbController {
  constructor(server) {
    this.server = server
    
    this.client = new Client({connectionString: 'postgres://user:pw@localhost:5432/postgres'})
    this.sequelize = new Sequelize('postgres://user:pw@localhost:5432/db', {logging:null})
  }

  async start() {
    this.server.log.info('DB', 'Initializing database')
    await connectToPostgres.call(this)
    await createDatabase.call(this)
    await connectToDatabase.call(this)
    await defineSchema.call(this)

    this.server.log.info('DB', 'Initialization complete')
    return Promise.resolve()
  }

  shutdown() {
    this.server.log.info('DB', 'Disconnecting')
    return Promise.resolve()
  }
}