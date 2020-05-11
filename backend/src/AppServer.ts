import { createServer, Server } from 'http'
import * as express from 'express'
import socketIO = require('socket.io')

class AppServer {
  private port: string
  private app: express.Application
  private server: Server
  private io: socketIO.Server

  constructor(port: string) {
    this.port = port
    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIO.listen(this.server, { origins: '*:*' })
    this.app.get('/', function(req, res) {
      res.send('Hello World!')
    })
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port)
    })
    this.io.on('connect', (clientSocket) => {
      console.log('Connected client on port %s.', this.port)

      clientSocket.on('message', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m))
        this.io.emit('message', m)
      })
    })
  }
}

export default AppServer
