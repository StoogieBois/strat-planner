import { TYPE_HOST_ROOM, TYPE_JOIN_ROOM } from './consts'

export enum RoomType {
  SIEGE,
  VALORANT,
  CSGO,
  RL
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
