import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch/dist'
import { makeStyles } from '@material-ui/core'

import map from '../maps/rl_pitch.png'

let ctx: CanvasRenderingContext2D | null

export default function Canvas() {
  const _board = useRef<HTMLCanvasElement>(null)
  const [isPainting, setIsPainting] = useState(false)
  const [prevPos, setPrevPos] = useState<IClient>({ clientX: 0, clientY: 0 })
  const [line, setLine] = useState<ILine[]>([])
  const [userStrokeStyle, setUserStrokeStyle] = useState('#EE92C2')

  useEffect(() => {
    if (_board.current) {
      console.log(_board.current)
      _board.current.width = 1000
      _board.current.height = 800
      ctx = _board.current.getContext('2d')
      if (ctx) {
        ctx.lineJoin = 'round'
        ctx.lineCap = 'round'
        ctx.lineWidth = 5
      }
    }
  }, [_board])

  const handleMouseDown = (event: MouseEvent) => {
    const { clientX, clientY } = event
    setIsPainting(true)
    setPrevPos({ clientX, clientY })
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isPainting) {
      const { clientX, clientY } = event
      const offsetData = { clientX, clientY }

      // Set the start and stop position of the paint event
      const positionData = {
        start: { ...prevPos },
        stop: { ...offsetData }
      }

      setLine([...line, positionData])
      paint(prevPos, offsetData, userStrokeStyle)
    }
  }

  const endPaintEvent = () => {
    if (isPainting) {
      setIsPainting(false)
    }
  }

  const paint = (prevPos: IClient, currPos: IClient, strokeStyle: string) => {
    const { clientX, clientY } = currPos
    const { clientX: x, clientY: y } = prevPos

    if (ctx) {
      ctx.beginPath()
      ctx.strokeStyle = strokeStyle
      // Move the the prevPosition of the mouse
      ctx.moveTo(x, y)
      // Draw a line to the current position of the mouse
      ctx.lineTo(clientX, clientY)
      // Visualize the line using the strokeStyle
      ctx.stroke()
    }

    setPrevPos({ clientX, clientY })
  }

  return (
    <canvas
      ref={_board}
      style={{ background: 'yellow' }}
      onMouseDown={handleMouseDown}
      onMouseLeave={endPaintEvent}
      onMouseUp={endPaintEvent}
      onMouseMove={handleMouseMove}
    />
  )
}

interface ILine {
  start: IClient
  stop: IClient
}

interface IClient {
  clientX: number
  clientY: number
}
