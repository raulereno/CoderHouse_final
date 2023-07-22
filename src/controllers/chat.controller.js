const { findUserService } = require("../services/user.service");

const getAllMessages = async (req, res) => {
  const user = await findUserService(req.user);

  res.render("chat", {
    title: "Chat",
    style: "index.css",
    user: user,
  });
};

const addMessages = async (req, res) => {
  await require("../socket").addMessagesSocket(req.body);
  res.send({ status: "success", payload: "Message Added" });
};

module.exports = {
  getAllMessages,
  addMessages,
};
