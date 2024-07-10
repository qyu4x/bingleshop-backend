const chatService = require('../service/chat.service');

const handleChatConnection = (socket, io) => {
  socket.on('chat message', async (msg) => {
    
    // const chat = await chatService.saveChat(msg);
    // io.emit('chat message', chat);

    io.emit('chat message', msg);
  });
};

module.exports = { handleChatConnection };
