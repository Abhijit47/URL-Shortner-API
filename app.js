const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const urlRouter = require("./routes/urlRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the URL Shortner API." });
});

app.use("/api/v1", urlRouter);

app.all("*", (req, res, next) => {
  return res.status(400).json({ message: `Can't ${req.method} request on this ${req.originalUrl} URL.` });
});

module.exports = app;