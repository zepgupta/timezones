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
    key: '6f7995d78a5f42f9a9c182711172012',
  },
  cache: 2,  //seconds
  auth: {
    secretKey: 'shhhhh'
  },
  compress: {
    opts: {}
  }
}
