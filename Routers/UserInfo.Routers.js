const express = require("express");
const UserInfoRouter = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Middlewares/cloudinaryConfig"); // Import the Cloudinary config
const userController = require("../Controllers/Profile.Controller");

// Configure Multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // Specify folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Specify allowed formats
  },
});

const upload = multer({ storage: storage });

// Handle file uploads (only for profileimg)
UserInfoRouter.post(
  "/save-user",
  upload.fields([{ name: "profileimg", maxCount: 1 }]), // Only handle 'profileimg'
  userController.saveUser
);


// Define other routes
UserInfoRouter.get("/profile", userController.getUserProfile);
UserInfoRouter.get("/:userid", userController.getSingleUserProfile);
UserInfoRouter.delete("/:userid", userController.deleteUserProfile);

module.exports = UserInfoRouter;
