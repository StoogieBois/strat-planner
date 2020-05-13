import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch/dist'
import { makeStyles } from '@material-ui/core'

import map from '../maps/rl_pitch.png'

const useStyles = makeStyles({
  image: {
    width: '100vw'
  }
})

function Canvas() {
  const classes = useStyles()
  return (
    <TransformWrapper>
      <TransformComponent>
        <img src={map} alt="" className={classes.image} />
      </TransformComponent>
    </TransformWrapper>
  )
}

export default Canvas
