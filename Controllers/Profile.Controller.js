const User = require("../Models/User.Model");

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


const saveUser = async (req, res) => {
  try {
    console.log("Received files:", req.files); 
    console.log("Received body:", req.body); 

    // Handle form data
    const userData = {
      ...req.body,
      profileimg: req.files['profileimg'] ? req.files['profileimg'][0].path : req.body.profileimg,
      catalogues: req.body.catalogues ? JSON.parse(req.body.catalogues) : [],
      Business: req.body.Business ? JSON.parse(req.body.Business) : [],
      otherLinks: req.body.otherLinks ? JSON.parse(req.body.otherLinks) : []
    };

    // Handle catalogues files
    if (req.files['catalogues']) {
      userData.catalogues = userData.catalogues.map((item, index) => {
        return {
          ...item,
          profileCatalogues: req.files['catalogues'][index] ? req.files['catalogues'][index].path : item.profileCatalogues
        };
      });
    }

    // Handle Business files
    if (req.files['Business']) {
      userData.Business = userData.Business.map((item, index) => {
        return {
          ...item,
          profileBusiness: req.files['Business'][index] ? req.files['Business'][index].path : item.profileBusiness
        };
      });
    }

    // Save user data
    const user = new User(userData);
    await user.save();

    // Generate a unique shareable link
    const shareableLink = `${req.protocol}://${req.get('host')}/profile/${user._id}`;

    res.status(201).json({
      message: "User saved successfully",
      user,
      shareableLink
    });
  } catch (error) {
    console.error('Error saving user:', error); // Log error for debugging
    res.status(500).json({ error: "Something went wrong while saving the user" });
  }
};

module.exports = saveUser;




module.exports = {
  saveUser,
  getUserProfile,
  getSingleUserProfile,
  deleteUserProfile
};
