import { Message, RoomType } from '../../client/src/utils/types'
import { Member } from './utils/types'

export type RoomId = string

// Data associated with room
export interface RoomData {
  img: string
  // transactions?: Transaction[]
}

class Room {
  public id: RoomId
  public type: RoomType
  public data: RoomData
  public members: Member[]

  constructor(id: string, type: RoomType) {
    this.id = id
    this.type = type
    this.members = []
  }

  public addMember(member: Member) {
    this.members.push(member)
  }

  public handleMessage(msg: Message) {
    // Persist and send message to other members
    const { type, payload } = msg
    console.log(`type=${type}, payload=${JSON.stringify(payload)}`)
  }
}

export default Room
