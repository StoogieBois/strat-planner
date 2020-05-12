import * as socketIO from 'socket.io'
import { RoomId, RoomType } from '../Room'
import { TYPE_HOST_ROOM, TYPE_JOIN_ROOM } from './consts'

// Data associated with member
export interface Member {
  id: string
  name: string
  avatarUrl?: string
  color: string
  socket: socketIO.Socket
}

// Message sent over the wire
export interface HostRoomMessage {
  type: typeof TYPE_HOST_ROOM
  payload: {
    roomType: RoomType
    username: string
    color: string
  }
}

export interface JoinRoomMessage {
  type: typeof TYPE_JOIN_ROOM
  payload: {
    roomId: string
    username: string
    color: string
  }
}

export type Message = HostRoomMessage | JoinRoomMessage
