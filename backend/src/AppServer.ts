import { createServer, Server } from 'http'
import express = require('express')
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
    this.io = socketIO(this.server)
    this.app.get('/', function(req, res) {
      res.send('Hello World!')
    })

    this.io.on('connect', (socket: any) => {
      console.log('Connected client on port %s.', port)

      socket.on('msg', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m))
        this.io.emit('message', m)
      })
    })
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port)
    })
  }
}

export default AppServer