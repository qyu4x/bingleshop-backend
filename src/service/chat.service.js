const chatRepository = require('../repository/chat.repository')
const {v4: uuidv4} = require('uuid');

const saveChat = async (userIdSender, userIdRecipient, message) => {
  const chat = await chatRepository.create({ 
    id: uuidv4(),
    user_id_sender: userIdSender, 
    user_id_recipient: userIdRecipient, 
    message: message 
  });
  return chat;
};

module.exports = { saveChat };
