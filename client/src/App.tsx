import React from 'react'
import useSocket from './hooks/use-socket.io-client'
import Canvas from './components/Canvas'
import { makeStyles } from '@material-ui/core/styles'

function App() {
  const [socket] = useSocket('http://localhost:8080', {
    autoConnect: false
  }) // need to pass this around
  socket.connect()

  socket.on('message', (text: string) => {
    console.log('CLIENT_console', text)
  })

  socket.emit('message', 'this is demo..')
  return (
    <>
      <Canvas />
    </>
  )
}

export default App
