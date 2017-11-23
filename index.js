const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketIo(server, { serveClient: false });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`Received connection from ${socket.id}`);

  io.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
