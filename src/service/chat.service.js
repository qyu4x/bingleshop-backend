const Chat = require('../model/chat');

const saveChat = async (msg) => {
  const chat = new Chat({ message: msg });
  await chat.save();
  return chat;
};

module.exports = { saveChat };
