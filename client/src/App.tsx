import React from 'react'
import useSocket from './hooks/use-socket.io-client'
import Canvas from './components/Canvas'
import { makeStyles } from '@material-ui/core/styles'
import { HostRoomMessage, Message, RoomType } from './utils/types'
import { TYPE_HOST_ROOM } from './utils/consts'
import Toolbar from './components/Toolbar'
import { RecoilRoot } from 'recoil'

function App() {
  const [socket] = useSocket('http://localhost:8080', {
    autoConnect: false
  }) // need to pass this around
  socket.connect()

  socket.on('message', (msg: Message) => {
    console.log('CLIENT_console', msg)
  })
  const hostRoom: HostRoomMessage = {
    type: TYPE_HOST_ROOM,
    payload: {
      roomType: RoomType.RL,
      username: 'PRAY',
      color: '#12ffff'
    }
  }
  socket.emit('message', hostRoom)
  return (
    <RecoilRoot>
      <Toolbar />
      <Canvas />
    </RecoilRoot>
  )
}

export default App
