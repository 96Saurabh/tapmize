const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profileimg: { type: String },
  first: { type: String, required: true },
  middle: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String },
  landmark: { type: String },
  contact: { type: String },
  aboutus: { type: String },
  otherLinks: [
    {
      icon: { type: String, required: true },
      urlLink: { type: String, required: true },
      title: { type: String, required: true },
    },
  ],
  catalogues: [
    {
      profileCatalogues: { type: String },
      heading: { type: String, required: true },
      subheading: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
  Business: [
    {
      profileBusiness: { type: String },
      heading: { type: String, required: true },
      subheading: { type: String, required: true },
      link: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
