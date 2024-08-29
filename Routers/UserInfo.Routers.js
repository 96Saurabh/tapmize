const express = require("express");
const UserInfoRouter = express.Router();
const multer = require("multer");
const path = require("path");
const userController = require("../Controllers/Profile.Controller");

// Multer Configuration for Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // File naming convention
  },
});

const upload = multer({ storage: storage });

// Handle file uploads
UserInfoRouter.post(
  "/save-user",
  upload.fields([
    { name: "profileimg", maxCount: 1 },
    { name: "profileCatalogues", maxCount: 4 },
    { name: "profileBusiness", maxCount: 4 } 
  ]),
  userController.saveUser
);


// Define other routes
UserInfoRouter.get("/profile", userController.getUserProfile);
UserInfoRouter.get("/:userid", userController.getSingleUserProfile);
UserInfoRouter.delete("/:userid", userController.deleteUserProfile);

module.exports = UserInfoRouter;
