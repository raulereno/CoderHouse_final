const jwt = require("jsonwebtoken");

const PRIVATE_KEY = "coderSecret";

function generateAuthToken(email, expire) {
  try {
    const token = jwt.sign({ username: email }, PRIVATE_KEY, {
      expiresIn: expire,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
}



function decodeAuthToken(token) {
  try {
    const decode = jwt.verify(token, PRIVATE_KEY);

    return decode;
  } catch (error) {
    return { error: "error", message: error.message }
  }
}

module.exports = { generateAuthToken, decodeAuthToken };
