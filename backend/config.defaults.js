module.exports = {
  log: {
    level: 'verbose',
  },
  http: {
    port: 3000,
  },
  db: {
    pgUrl: 'postgres://user:pw@localhost:5432/postgres',
    dbUrl: 'postgres://user:pw@localhost:5432/db',
    force: true,
  },
  api: {
    url: 'http://api.worldweatheronline.com/premium/v1/tz.ashx',
    key: '2a24574a81f5411c986205747173009',
  },
  auth: {
    secretKey: 'shhhhh'
  }
}