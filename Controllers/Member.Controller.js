const MemberProfile = require("../Models/Member.Model");

const memberProfile = async (req, res) => {
  try {
    const { name, email, phone, instlink, snapChatlink, whatuplink, linkedIn } =
      req.body;

    const userData = new MemberProfile({
      name,
      email,
      phone,
      instlink,
      snapChatlink,
      whatuplink,
      linkedIn,
    });
    await userData.save();

    res.json({
      message: "UserProfile creted successfully",
      userData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMemberProfile = async (req, res) => {
  try {
    const user = await MemberProfile.find();
    res.status(200).json({
      message: "all Member get successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving user profiles." });
  }
};
module.exports = {
  memberProfile,
  getMemberProfile,
};
