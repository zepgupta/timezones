module.exports.connectToPostgres = async function() {
  try{
    this.server.log.info('DB', 'Connecting to postgres server')
    await this.client.connect()
  } catch(err) {
    this.server.log.error('DB', 'Error connecting to postgres server')
    this.server.log.error('DB', err)
    process.exit(1)
  }
}

module.exports.createDatabase = async function() {
  try {
    this.server.log.info('DB', 'Creating database')
    await this.client.query('CREATE DATABASE db')
    await this.client.end()
  } catch (err) {
    if(!~err.message.indexOf('already exists') > -1) {
      this.server.log.warn('DB', 'Database already exists.')
    } else {
      this.server.log.error('DB', 'Unexpected error when creating database')
      this.server.log.error('DB', err)
      process.exit(1)
    }
  }
}


const connectToDatabase = async function() {
  try {
    this.server.log.info('DB', 'Connecting to database with sequelize')
    await this.sequelize.authenticate()    
  } catch(err) {
    this.server.log.error('DB', 'Error in connecting to database')
    // this.server.log.error('DB', err)
    process.exit(1)
  }
}
module.exports.connectToDatabase = connectToDatabase