module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'modify a timezone')

  let { userId, tzId } = req.params

  try {
    this.server.log.error('DB', 'finding timezone by id and modifying')
    let timezone = await this.server.db.sequelize.models.timezone.findById(tzId)
    let resp = await timezone.update(Object.assign({}, timezone, req.body))
    res.send(resp)
  } catch(err) {
    this.server.log.error('DB', 'finding timezone by id and modifying')
    this.server.log.verbose('DB', err) 
    res.send({})
  }
}