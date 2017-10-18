module.exports = async function seed(){
  this.log.info('SETUP', 'SEEDING...')
  await this.db.sequelize.models.user.bulkCreate([{
    firstName: "Ted",
    lastName: "Mosby",
    role: 'ADMIN',
    email: "tedmosby@gmail.com",
    password: "password"
  },{
    firstName: "Barney",
    lastName: "Stinson",
    role: 'ADMIN',
    email: "barneyStinson@gmail.com",
    password: "pw"
  },{
    firstName: "Marshall",
    lastName: "Erickson",
    role: 'USER',
    email: "marshall@gmail.com",
    password: "pw"
  }])

  this.log.info('SETUP', '...COMPLETE')
}