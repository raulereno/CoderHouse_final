const ChatDao = require("../chat.dao");
const messageSchema = require("../../models/message.model");
const chatDAO = new ChatDao();

class ChatRepository {
  async getAllMessages() {
    const result = await chatDAO.getAllMessages();
    return result;
  }

  async createMessage(message) {
    const result = await chatDAO.createMessage(message);

    return result;
  }
}

module.exports = ChatRepository;
