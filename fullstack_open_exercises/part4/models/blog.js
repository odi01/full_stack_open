const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    required: [true, "Must have likes feild"],
  },
});

module.exports = mongoose.model("Blog", blogSchema);
