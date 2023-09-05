require('mongoose-type-url');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Url } = mongoose.SchemaTypes;

const urlSchema = new Schema({
  urlID: {
    type: String,
    required: true
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortenUrl: {
    type: String,
    default: "",
  },
  clickCount: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
}, { versionKey: false });


//compile
const URL = mongoose.model("URL", urlSchema);

module.exports = URL;