const nodeUrl = require('url');
const nanoId = require("nanoid");
const URL = require("./../models/urlModel");

exports.createShortURL = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    const urlID = nanoId.nanoid();
    const baseURL = process.env.BASE;

    // url validation
    // parse the url and check protocol
    const isValidURL = nodeUrl.parse(originalUrl);

    if (isValidURL.protocol !== 'https:' && isValidURL.protocol !== 'http:') {
      return res.status(400).json({ message: "URL is not valid!!!.Try with valid URL" });
    }

    // check url is exist or not
    const url = await URL.findOne({ originalUrl });
    if (url) {
      return res.status(400).json({ message: "URL is Already Shortend!!!.", ShortenURL: url.shortenUrl });
    }

    // create a shorten url with combine of base URL and nanoid
    const shortenUrl = `${baseURL}/api/v1/${urlID}`;

    // create a new document
    const newURL = await URL.create({
      originalUrl,
      shortenUrl,
      urlID,
      date: new Date()
    });

    // save this document
    const saveURL = await newURL.save();

    // return a response to the user
    res.status(200).json({ message: "success", URL: saveURL.shortenUrl });


  } catch (err) {
    return res.status(400).json({ message: "Something went wrong shortning URL.", error: err.message });
  }
};

exports.getShortURL = async (req, res, next) => {
  try {
    // Get the URL ID from request parameter
    const { urlId } = req.params;

    // find the document associated with this id
    const existingURL = await URL.findOne({ urlID: urlId });
    if (!existingURL) {
      return res.status(400).json({ message: "Provided id not matched!!!" });
    }

    // if exist the url
    // update the click count
    await URL.updateOne(
      { urlID: urlId },
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    res.status(200).redirect(existingURL.originalUrl);

  } catch (err) {
    return res.status(400).json({ message: "Something went wrong getting URL.", error: err.message });
  }
};