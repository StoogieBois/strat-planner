import express = require('express');
import socketIO = require('socket.io');
import {createServer, Server} from 'http';

const port: string = process.env.PORT || '8080';
const app: express.Application = express();
const server: Server = createServer(app);
const io = socketIO(server);
server.listen(port, () => {
    console.log('Running server on port %s', port);
});

app.get('/', function (req, res) {
    res.send('Hello World!')
});

io.on('connect', (socket: any) => {
    console.log('Connected client on port %s.', port);

    socket.on('msg', (m: any) => {
        console.log('[server](message): %s', JSON.stringify(m));
        io.emit('message', m);
    });
});
