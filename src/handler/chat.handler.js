const chatService = require('../service/chat.service');
const { createChatSchema } = require('../payload/request/chat.request');

const handleChatConnection = (socket, io) => {
  const {id: userId, role: userRole } = socket.user
  
  if (userRole === 'ADMIN') {
    socket.join('admins');
  } else {
    socket.join(userId);
  }

  socket.on('chat message', async (payload) => {
    
    const { error } = createChatSchema.validate(JSON.parse(payload));

    if (error) {
      socket.emit('error', { message: error.details[0].message });
      console.log(error)
      return;
    }
    
    const { user_id_recipient, message } = JSON.parse(payload);
    
    if (userRole === 'USER') {
      const chat = await chatService.saveChat(userId, userId, message);
      // Emit message to all admins
      io.to('admins').emit('chat message', chat);
    } else if (userRole === 'ADMIN') {
      const chat = await chatService.saveChat(userId, user_id_recipient, message);
      // Emit message to specific user
      io.to(user_id_recipient).emit('chat message', chat);
    }
    
  });
};

module.exports = { handleChatConnection };
