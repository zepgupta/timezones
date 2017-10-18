module.exports = {
  log: {
    level: 'verbose',
  },
  http: {
    port: 3000,
    headers: {
      methods: 'GET, PUT, POST, DELETE, OPTIONS',
      cors: '*',
    }
  },
  db: {
    pgUrl: 'postgres://postgres:password@db:5432/postgres',
    dbUrl: 'postgres://postgres@db:5432/postgres',
    // pgUrl: 'postgres://user:pw@db:5432/postgres',
    // dbUrl: 'postgres://user:pw@db:5432/db',
    force: true,
  },
  api: {
    url: 'http://api.worldweatheronline.com/premium/v1/tz.ashx',
    key: '2a24574a81f5411c986205747173009',
  },
  cache: 2,  //seconds
  auth: {
    secretKey: 'shhhhh'
  },
  compress: {
    opts: {}
  }
}