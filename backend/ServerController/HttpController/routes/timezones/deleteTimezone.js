module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'delete a timezone')
  
  const { Timezone } = this.server.db.sequelize.models.timezone
  const tzId = req.params.tzId // timezone id

  try {
    this.server.log.info('DB', 'delete timezone')
    let timezone = await Timezone.findById(tzId)
    let resp = await timezone.destroy()
    res.send(resp)
  } catch(err) {
    this.server.log.error('DB', 'delete a timezone')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}