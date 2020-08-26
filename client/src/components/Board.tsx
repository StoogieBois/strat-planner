import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Konva from 'konva'
import { Layer, Stage, Text, Circle } from 'react-konva'
import { Toolbar } from './index'

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-flex'
  }
}))

function Board() {
  const classes = useStyles()

  const handleDragStart = (e: Konva.KonvaEventObject<globalThis.DragEvent>) => {
    if (e.target && e.target.setAttrs) {
      e.target.setAttrs({
        shadowOffset: {
          x: 15,
          y: 15
        },
        scaleX: 1.1,
        scaleY: 1.1
      })
    }
  }
  const handleDragEnd = (e: Konva.KonvaEventObject<globalThis.DragEvent>) => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    })
  }

  return (
    <div className={classes.root}>
      <Toolbar />
      {/*<Canvas />*/}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Welcome to the Strat Planner!" />
          <Circle
            radius={50}
            x={100}
            y={100}
            width={100}
            height={100}
            fill="red"
            shadowBlur={5}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default Board
