import { Tools } from 'react-sketch'

const toolMapper = (tool: string) => {
  switch (tool) {
    case 'select':
      return Tools.Select
    case 'pencil':
      return Tools.Pencil
    case 'rectangle':
      return Tools.Rectangle
    default:
      return
  }
}

export default toolMapper
