import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useRecoilState } from 'recoil/dist'
import { toolState } from '../atoms/atoms'

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    width: 64
  }
}))

function Toolbar() {
  const classes = useStyles()
  const [tool, setTool] = useRecoilState(toolState)
  return (
    <div className={classes.root}>
      {['select', 'draw'].map((el) => (
        <div key={el} onClick={() => setTool(el)}>
          {tool === el ? <b>{el}</b> : el}
        </div>
      ))}
    </div>
  )
}

export default Toolbar
