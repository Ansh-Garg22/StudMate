const Subject = require("../models/subject"); // Import the Subject model
const User = require("../models/user");

async function renderDashboard(req, res) {
  try {
    if (!req.user) return res.redirect("/login");
    const userId = req.user._id;

    // Find the user by ID and populate the attendance field with subject details
    const user = await User.findById(userId).populate({
      path: "attendance.subject",
      model: "Subject",
      select: "name",
    });

    // Extract the required data from the user object
    const userData = {
      name: user.name,
      subjects: user.attendance.map((attendance) => ({
        name: attendance.subject.name,
        presentCount: attendance.presentCount,
        absentCount: attendance.absentCount,
      })),
    };

    // Render the Dashboard EJS template with user's name and subject details
    return res.render("Dashboard", userData);
  } catch (error) {
    console.error("Error rendering dashboard:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// Export the function to make it callable from elsewhere
module.exports = renderDashboard;
