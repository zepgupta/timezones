module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'delete a timezone')
  
  let userId = req.params.user // verify the person has the right to delete it
  let tzId = req.params.tzId // timezone id

  try {
    let timezone = await this.server.db.sequelize.models.timezone.findById(tzId)
    let resp = await timezone.destroy()
    res.send(resp)
  } catch(err) {
    this.server.log.error('DB', 'delete a timezone')
    this.server.log.verbose('DB', err)
    res.send({})
  }
}