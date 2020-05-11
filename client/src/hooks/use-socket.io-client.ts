// Copy w/ types from https://github.com/iamgyz/use-socket.io-client

import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

const useSocket = (uri: string, args: SocketIOClient.ConnectOpts) => {
  const _socket: SocketIOClient.Socket = io(uri, args)
  const { current: socket } = useRef(_socket)
  useEffect(() => {
    return () => {
      socket && socket.removeAllListeners()
      socket && socket.close()
    }
  }, [socket])
  return [socket]
}

export default useSocket
