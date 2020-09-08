import React from 'react'
import { Button } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { toolState } from '../atoms'

const Toolbar: React.FC = () => {
  const [, setTool] = useRecoilState(toolState)

  return (
    <div>
      <Button onClick={() => setTool('select')}>Select</Button>
      <Button onClick={() => setTool('pencil')}>Pencil</Button>
      <Button onClick={() => setTool('rectangle')}>Rectangle</Button>
    </div>
  )
}

export default Toolbar
