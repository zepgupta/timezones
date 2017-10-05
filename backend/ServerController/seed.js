module.exports = async function seed(){
  this.log.info('DEV', 'SEEDING...')
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

  await this.db.sequelize.models.timezone.bulkCreate([{
    name: "Ted's first timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 1
  },{
    name: "Ted's 2nd timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 1
  },{
    name: "Barney's first timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 2
  },{
    name: "Barney's second timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 2
  },{
    name: "Barney's third timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 2
  },{
    name: "Marshall's timezone",
    city: "New York",
    country: "USA",
    localTime: "fasdf",
    utcOffset: "5",
    userId: 3
  }])
  this.log.info('DEV', '...COMPLETE')
}