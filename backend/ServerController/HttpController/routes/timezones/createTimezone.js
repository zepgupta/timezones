// available to user and admin
module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'create a timezone')

  const { Timezone } = this.server.db.sequelize.models.timezone
  let userId = req.params.userId 
  let { city, country, name } = req.body
  
  let data = await this.server.api.submitRequest(city, country)
  if(data.error) {
    this.server.log.error('API', 'Error received from API:')
    data.error.forEach(e => this.server.log.error('API', '- '+e.msg))
    res.send({})
  } else {
    try {
      this.server.log.info('DB', 'creating timezone')
      let timezone = await Timezone.create({
        userId,
        name,
        city,
        country,
        localTime: data.time_zone[0].localtime,
        utcOffset: data.time_zone[0].utcOffset
      })
      res.send(timezone)
    } catch(err) {
      this.server.log.error('DB', 'creating timezone')
      this.server.log.verbose('DB', err)
      res.send({})
    }
  }
}