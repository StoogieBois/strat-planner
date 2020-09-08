import React from 'react'
import { SketchField } from 'react-sketch'
import { useRecoilState } from 'recoil'
import { toolState } from '../atoms'
import toolMapper from '../utils/toolMapper'

function Canvas() {
  const [tool] = useRecoilState(toolState)

  return (
    <SketchField width="1024px" height="768px" undoSteps={15} tool={toolMapper(tool)} lineColor="black" lineWidth={3} />
  )
}

export default Canvas
