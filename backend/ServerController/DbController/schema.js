const Sequelize = require('sequelize')

module.exports = async function defineSchema() {
  this.server.log.info('DB', 'Preparing database schema')
  try {
    var User = this.sequelize.define('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      role: Sequelize.STRING,//ENUM('USER', 'MANAGER', 'ADMIN'),
      firstName: {
        type: Sequelize.STRING,
        isAlpha: true
      },
      lastName: {
        type: Sequelize.STRING,
        isAlpha: true
      },
      fullName: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
        }
      },
      email: {
        type:Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: Sequelize.STRING
    })

    var Timezone = this.sequelize.define('timezone', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,  
      },
      name: Sequelize.STRING,
      city: {
        type: Sequelize.STRING,
        notNull: true,
        isAlpha: true
      },
      country: {
        type: Sequelize.STRING,
        notNull: true,
        isAlpha: true
      },
      localTime: Sequelize.STRING,
      utcOffset: Sequelize.STRING
    })

    User.belongsToMany(Timezone, {through: 'CreatedBy'} )
    Timezone.belongsTo(User)
    await this.sequelize.sync({force: this.server.config.get('db:force')})
  } catch(err) {
    this.server.log.error('DB', 'Error in preparing database schema')
    this.server.log.error('DB', err)
    process.exit(1)
  }
}