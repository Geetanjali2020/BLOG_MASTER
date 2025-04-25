import User from "../Database/models/UserModel.js";

export const getProfile = async (req, res) => {
  res.render("profile.ejs");
};

export const getProfileData = async (req, res) => {
 const user = req.user;
  const userData = await User.findById(user.id).select("-password");
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user: userData });

};

export const viewProfile = async (req, res) => {
  try {
    const user = req.params.id;
    const userData = await User.findById(user).select("name jobTitle about profileImage");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, jobTitle, about} = req.body;
        const profileImage = req.file.filename;
        
        const userToUpdate = await User.findById(user.id);
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }
        userToUpdate.name = name;
        userToUpdate.jobTitle = jobTitle;
        userToUpdate.about = about;
        userToUpdate.profileImage = profileImage;
        await userToUpdate.save();
        res.json({success:true,message:"Profile updated successfully"});

    } catch (error) {
        console.error(error)
    }
}