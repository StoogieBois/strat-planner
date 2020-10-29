import React from 'react'

import useSocket from './hooks/use-socket.io-client'
import Canvas from './components/Canvas'
import { HostRoomMessage, Message, RoomType } from './utils/types'
import { TYPE_HOST_ROOM } from './utils/consts'
import Toolbar from './components/Toolbar'
import AppBar from './components/AppBar'
import { Box } from '@chakra-ui/core'
import { AiFillGithub } from 'react-icons/all'

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
    <Box position="relative">
      <AppBar />
      <Toolbar />
      <Canvas />
      <Box
        as={AiFillGithub}
        position="fixed"
        right="24px"
        bottom="24px"
        cursor="pointer"
        color="white"
        onClick={() =>
          window.open(
            'https://github.com/StoogieBois/strat-planner',
            '_blank',
            'noopener,noreferrer'
          )
        }
        size="32px"
      />
    </Box>
  )
}

export default App
