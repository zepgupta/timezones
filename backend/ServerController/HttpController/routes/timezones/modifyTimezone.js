module.exports = async function (req, res, next) {
  this.server.log.info('HTTP', 'modify a timezone')

  const Timezone = this.server.db.sequelize.models.timezone
  const { userId, tzId } = req.params

  try {
    this.server.log.info('DB', 'finding timezone by id and modifying')
    let timezone = await Timezone.find({where: {id:tzId, userId: userId}})
    if(timezone){
      let resp = await timezone.update(Object.assign({}, timezone, req.body))
      res.send(resp)
    } else {
      res.send({error: 'request is unauthorized'})
    }
  } catch(err) {
    this.server.log.error('DB', 'finding timezone by id and modifying')
    this.server.log.verbose('DB', err) 
    res.send({})
  }
}