const ChatRepository = require("../dao/repositories/chat.repository");

const chatRepository = new ChatRepository();

const getMessagesServices = async () => {
  try {
    let response = await chatRepository.getAllMessages();
    return response;
  } catch (error) {
    throw Error(error);
  }
};

const addMessageServices = async (message) => {
  try {
    let response = await chatRepository.createMessage(message);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { getMessagesServices, addMessageServices };
