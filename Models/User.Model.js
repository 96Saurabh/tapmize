const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profileimg: { type: String },
  first: { type: String, required: true },
  middle: { type: String, required: true },
  last: { type: String, required: true },
  email: String,
  landmark: String,
  contact: String,
  aboutus: String,
  profileimg: String,
  otherLinks: [
    {
      icon: String,
      title: String,
      urlLink: String,
    },
  ],
  shareableLink: String,
});

module.exports = mongoose.model("User", UserSchema);
