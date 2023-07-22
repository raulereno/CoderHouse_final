const http = require("http");
const { Server } = require("socket.io");
const app = require("./index");
const {
  getMessagesServices,
  addMessageServices,
} = require("./services/chat.service");

const server = http.createServer(app);

const io = new Server(server);

const recoverMessages = async () => {
  const messages = await getMessagesServices();
  return messages;
};

io.on("connection", async (socket) => {
  socket.emit("all messages", await recoverMessages());
});

module.exports = {
  server,
  addMessagesSocket: async function (message) {
    await addMessageServices(message);
    io.emit("all messages", await recoverMessages());
  },
};
