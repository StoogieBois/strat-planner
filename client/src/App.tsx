import React from 'react'
import logo from './logo.svg'
import './App.css'
import useSocket from './hooks/use-socket.io-client'

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
