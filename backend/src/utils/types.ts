import * as socketIO from 'socket.io'

// Data associated with member
export interface Member {
  id: string
  name: string
  avatarUrl?: string
  color: string
  socket: socketIO.Socket
}
