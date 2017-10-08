const ajax = require('superagent')

module.exports = class ApiController {
  constructor(server) {
    this.server = server
    this.apiUrl = this.server.config.get('api:url')
    this.apiKey = this.server.config.get('api:key')
  }

  async start() {
    this.server.log.info('API', 'Testing API connection...')
    let data = await this.submitRequest('New York', 'USA')
    if(!data || !data.error) {
      this.server.log.info('API', 'API connection working properly')
    } else {
      this.server.log.error('API', 'Error received from API:')
      data.error.forEach(e => this.server.log.error('API', '- '+e.msg))
    }
  }

  shutdown() {
    this.server.log.info('API', 'API connection offline')
    return Promise.resolve();
  }

  async submitRequest(city, country) {
    this.server.log.info('API', 'Submitting API request')
    //format city and country names for api request
    if(city.indexOf(' ') > -1) city = city.replace(/ /g, '+') 
    if(country && country.indexOf(' ') > -1) country = country.replace(/ /g, '+') 
    let url = `${this.apiUrl}?q=${city},${country}&key=${this.apiKey}&format=json`
    
    try {
      let res =  await ajax.get(url)
      return res.body.data
    } catch (err) {
      this.server.log.error('API', 'Error while making ajax request')
      return Promise.resolve(false)
    }
  }
}