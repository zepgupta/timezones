const mcache = require('memory-cache')

module.exports = (duration) => {
  return (req, res, next) => {
    let key = '__timezones__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if(cachedBody) {
      res.send(cachedBody)
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration*1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}