import { Tools } from 'react-sketch'

const toolMapper = (tool: string) => {
  switch (tool) {
    case 'select':
      return Tools.Select
    case 'line':
      return Tools.Line
    case 'pencil':
      return Tools.Pencil
    case 'rectangle':
      return Tools.Rectangle
    case 'circle':
      return Tools.Circle
    case 'pan':
      return Tools.Pan
    default:
      return
  }
}

export default toolMapper
