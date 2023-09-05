const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGO_URL = process.env.DATABASE_URI;
const MONGO_PASSWORD = process.env.DATABASE_PASSWORD;

const DB = MONGO_URL.replace("<password>", MONGO_PASSWORD);

mongoose.connect(DB)
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => {
    console.log(`Something went wrong in connection. ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`app is listen on port ${PORT}`);
});