const socketIo = require('socket.io');
const { handleChatConnection } = require('../handler/chat.handler');
const { authorizeSocket } = require('../middleware/auth.middleware');


const setupSocket = (server) => {
  const io = socketIo(server);

  io.use(authorizeSocket(['ADMIN', 'USER']))

  io.on('connection', (socket) => {
    console.log(`User "${socket.user.username}" connected`);

    // console.log(socket.user)

    handleChatConnection(socket, io);

    socket.on('disconnect', () => {
      console.log(`User "${socket.user.username}" disconnected`);
    });
  });
};

module.exports = { setupSocket };