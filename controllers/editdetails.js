const User = require("../models/user");

async function editStudentDetails(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("editdetails", { user });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateStudentDetails(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, rollNo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, rollNo },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.redirect(`/students/${userId}`); // Redirect to the student details page
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { editStudentDetails, updateStudentDetails };