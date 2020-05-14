import React from 'react'
import logo from './logo.svg'
import './App.css'
import useSocket from './hooks/use-socket.io-client'
import { HostRoomMessage, Message, RoomType } from './utils/types'
import { TYPE_HOST_ROOM } from './utils/consts'

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
