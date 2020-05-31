import {
  TOOL_ICON, TOOL_LINE,
  TOOL_PEN,
  TOOL_SHAPE,
  TOOL_TEXT,
  TYPE_HOST_ROOM,
  TYPE_JOIN_ROOM,
  TYPE_TOOL
} from './consts'

export enum RoomType {
  SIEGE,
  VALORANT,
  CSGO,
  RL
}

/** Socket Messages **/

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

type Action = 'add' | 'edit' | 'delete'

export interface ToolMessage {
  id?: string
  type: typeof TYPE_TOOL
  action: Action
  payload: Drawable
}

export type Message = HostRoomMessage | JoinRoomMessage | ToolMessage

/** Whiteboard Tools **/

type Color = string

type Point = {
  x: number
  y: number
}

interface Drawable {
  origin: Point
  color: Color
  scaleX: number
  scaleY: number

  draw(ctx: CanvasRenderingContext2D): void
}

interface Draggable {
  highlighted: boolean

  contains(pt: Point): boolean
}

interface Rotatable {
  rotation: number

  rotate(ctx: CanvasRenderingContext2D): void
}

export interface PenTool extends Drawable, Draggable {
  type: typeof TOOL_PEN
  points: Point[] // all except origin point
}

export interface TextTool extends Drawable, Draggable, Rotatable {
  type: typeof TOOL_TEXT
  text: string
  origin: Point // Top-left
}

export interface IconTool extends Drawable, Draggable {
  type: typeof TOOL_ICON
  src: string
  origin: Point // Top-left
}

type Shape = 'rectangle' | 'circle' | 'triangle'

export interface ShapeTool extends Drawable, Draggable, Rotatable {
  type: typeof TOOL_SHAPE
  shapeName: Shape
  origin: Point // Top-left
  height: number
  width: number
}

export interface LineTool extends Drawable, Draggable, Rotatable {
  type: typeof TOOL_LINE
  hasArrowHead: boolean
  origin: Point
  end: Point
}
