import React, { useEffect, useRef, useState } from 'react'
import { SketchField } from 'react-sketch'
import { useRecoilState } from 'recoil'
import { toolState } from '../atoms'
import toolMapper from '../utils/toolMapper'
import { CanvasObject } from '../utils/types'

function Canvas() {
  const canvasRef: CanvasObject = useRef(null)
  const [tool, setTool] = useRecoilState(toolState)
  const [lastTool, setLastTool] = useState('pencil')

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { code } = event

      if (code === 'Space') {
        setTool(lastTool)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, code, ctrlKey, repeat } = event

      if (repeat) return

      if (ctrlKey && key.toLowerCase() === 'z') {
        canvasRef.current.undo()
      }

      if (ctrlKey && key.toLowerCase() === 'y') {
        canvasRef.current.redo()
      }

      if (key === 'Delete') {
        canvasRef.current?.removeSelected()
      }

      if (code === 'Space') {
        setLastTool(tool)
        setTool('pan')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <SketchField
      ref={canvasRef}
      width={window.innerWidth + 2}
      height={window.innerHeight - 56}
      undoSteps={15}
      tool={toolMapper(tool)}
      backgroundColor="#131C2F"
      lineColor="white"
      lineWidth={3}
    />
  )
}

export default Canvas
