require("dotenv").config();

const { server } = require("./src/socket");
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening in port ${server.address().port}`);
  console.log(`${process.env.API_URL_PROD || `http://localhost:${server.address().port}`}`);
});

server.on("error", (error) => console.log(error));
