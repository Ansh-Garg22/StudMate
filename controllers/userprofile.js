const User = require("../models/user");
const Subject = require("../models/subject");

async function getStudentDetails(req, res) {
  try {
    const userId = req.params.id; // Assuming you're passing the user ID in the URL parameter
    const user = await User.findById(userId)
    .populate({
      path: "subjects",
      model: "Subject",
      select: "_id name code",
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("userprofile", { user });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getStudentDetails };