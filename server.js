const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('👤 User connected');

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`🔗 User joined room: ${room}`);
  });

  socket.on('pulse', ({ type, ms, room }) => {
    console.log(`📨 Pulse to room [${room}]:`, { type, ms });
    socket.to(room).emit('pulse', { type, ms });
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
