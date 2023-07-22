const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;


try {
  mongoose.connect(MONGO_URL);
  console.log("Database connected");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}
