import { createServer } from 'http'
import * as express from 'express'
import * as socketIO from 'socket.io'
import Room from './Room'
import { Message } from '../../client/src/utils/types'
import { TYPE_HOST_ROOM, TYPE_INVALID_ROOM, TYPE_JOIN_ROOM } from '../../client/src/utils/consts'
import { genId } from './utils/id'

const port: string = process.env.PORT || '8080'
const rooms: Room[] = []

const app = express()
const server = createServer(app)
const io = socketIO.listen(server, { origins: '*:*' })

app.get('/', (req, res) => {
  res.send('Hello world!')
})

server.listen(port, () => {
  console.log('Running server on port %s', port)
})

io.on('connect', (clientSocket) => {
  console.log('Connected client on port %s.', port)

  clientSocket.on('disconnect', () => console.log('Client disconnected'))

  clientSocket.on('message', (msg: Message) => {
    console.log('SERVER_console', msg)
    switch (msg.type) {
      case TYPE_HOST_ROOM:
        {
          const { roomType, username, color } = msg.payload
          const room: Room = new Room(genId(), roomType)
          rooms.push(room)
          clientSocket.join(room.id)
          room.addMember({
            id: genId(),
            color: color ?? '#000000',
            name: username,
            socket: clientSocket
          })
        }
        break
      case TYPE_JOIN_ROOM:
        {
          const { roomId, username, color } = msg.payload
          const room = rooms.find((r) => r.id === roomId)
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

export default AppServer
