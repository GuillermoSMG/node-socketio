import express from 'express';
import { Server } from 'socket.io';

import http from 'http';
import { PORT } from '../config.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('message', data => {
    socket.broadcast.emit('message', {
      body: data,
      from: socket.id.slice(6),
    });
  });
});
server.listen(PORT);
console.log(`Server on port ${PORT}`);
