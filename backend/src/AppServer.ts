import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIO from 'socket.io'
import Room from './Room'
import { Message } from './utils/types'
import { TYPE_HOST_ROOM, TYPE_INVALID_ROOM, TYPE_JOIN_ROOM } from './utils/consts'
import { genId } from './utils/id'

class AppServer {
  private port: string
  private app: express.Application
  private server: Server
  private io: socketIO.Server
  private rooms: Room[]

  constructor(port: string) {
    this.port = port
    this.app = express()
    this.server = createServer(this.app)
    this.io = socketIO.listen(this.server, { origins: '*:*' })
    this.app.get('/', function(req, res) {
      res.send('Hello World!')
    })
    this.rooms = []
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port)
    })
    this.io.on('connect', (clientSocket) => {
      console.log('Connected client on port %s.', this.port)

      clientSocket.on('disconnect', () => console.log('Client disconnected'))

      clientSocket.on('message', (msg: Message) => {
        console.log('SERVER_console', msg)
        switch (msg.type) {
          case TYPE_HOST_ROOM: {
            const { roomType, username, color } = msg.payload
            const room: Room = new Room(genId(), roomType)
            this.rooms.push(room)
            clientSocket.join(room.id)
            room.addMember({
              id: genId(),
              color: color ?? '#000000',
              name: username,
              socket: clientSocket
            })
          }
            break
          case TYPE_JOIN_ROOM: {
            const { roomId, username, color } = msg.payload
            const room = this.rooms.find(r => r.id === roomId)
            if (!room) {
              clientSocket.emit('message', {
                type: TYPE_INVALID_ROOM
              })
              break
            }
            room.addMember({
              id: genId(),
              color: color ?? '#000000',
              name: username,
              socket: clientSocket
            })
          }
            break
        }
      })
    })
  }
}

export default AppServer
