module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'modify a timezone')

  let { userId, tzId } = req.params
  let updates = req.body

  let timezone
  try {
    timezone = await this.server.db.sequelize.models.timezone.findById(tzId)
  } catch(err) {
    this.server.log.error('DB', 'error finding timezone by id')
    this.server.log.verbose('DB', err) 
    res.send({})
  }

  try {
    let resp = await timezone.update(Object.assign({}, timezone, updates))
    res.send(resp)
  } catch(err) {
    this.server.log.error('DB', 'error modifying a timezone')
    this.server.log.verbose('DB', err) 
  }
}