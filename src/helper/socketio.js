const socketIo = require('socket.io');
const { handleChatConnection } = require('../handler/chat.handler');

const setupSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('User connected');
    
    handleChatConnection(socket, io);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = { setupSocket };