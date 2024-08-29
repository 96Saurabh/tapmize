const mongoose = require("mongoose");

const memberProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    instlink: {
      type: String,
    },
    snapChatlink: {
      type: String,
    },

    whatuplink: {
      type: String,
    },

    linkedIn: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const MemberProfile = mongoose.model("MemberProfile", memberProfileSchema);
module.exports = MemberProfile;
