const User = require("../Models/User.Model");

const saveUser = async (req, res) => {
  try {
    console.log("Received files:", req.files);
    console.log("Received body:", req.body);

    // Ensure `otherLinks` is parsed correctly
    let otherLinks = req.body.otherLinks;

    // Check if `otherLinks` is a string (meaning it needs parsing)
    if (typeof otherLinks === "string") {
      otherLinks = JSON.parse(otherLinks);
    }

    // Prepare user data with necessary fields
    const userData = {
      ...req.body,
      profileimg: req.files["profileimg"]
        ? req.files["profileimg"][0].path // Use Cloudinary URL
        : req.body.profileimg,
      otherLinks: otherLinks || [], // Use the parsed `otherLinks` or default to an empty array
    };

    // Save user data to the database
    const user = new User(userData);
    await user.save();

    // Generate a unique shareable link
    const shareableLink = `${req.protocol}://${req.get("host")}/api/v1/profile/${user._id}`;

    // Update the user with the generated shareable link
    user.shareableLink = shareableLink;
    await user.save(); // Save the updated user with the shareable link

    res.status(201).json({
      message: "User saved successfully",
      user,
      shareableLink,
    });
  } catch (error) {
    console.error("Error saving user:", error); // Log error for debugging
    res.status(500).json({ error: "Something went wrong while saving the user" });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      message: "all user get successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving user profiles." });
  }
};

const getSingleUserProfile = async (req, res) => {
  const uid = req.params.userid;
  try {
    const users = await User.findById(uid);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};


const deleteUserProfile = async (req, res) => {
  const { userid } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  saveUser,
  getUserProfile,
  getSingleUserProfile,
  deleteUserProfile
};



