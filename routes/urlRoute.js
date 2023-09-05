const express = require("express");
const { createShortURL, getShortURL } = require("../controllers/urlController");
const router = express.Router();

router.route("/createshorturl")
  .post(createShortURL);

router.route("/:urlId")
  .get(getShortURL);

module.exports = router;