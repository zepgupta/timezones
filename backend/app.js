const Server = require('./ServerController/_index')
const config = require('./config.defaults')

function stop_server() {
  if (server) {
    server.shutdown().then(() => process.exit(0))
  } else {
    process.exit(0)
  }
}

process.on('SIGTERM', stop_server)
process.on('SIGINT', stop_server)
process.on('disconnect', stop_server)

const server = new Server(config)

server.start()