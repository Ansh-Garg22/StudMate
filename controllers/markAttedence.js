const Subject = require("../models/subject");
const User = require("../models/user");

const renderMarkAttendance = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).send("Subject not found");
    }
    res.render("markAtt", { subject });
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).send("Internal Server Error");
  }
};

const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const subjectId = req.body.subjectId;
    const isPresent = req.body.isPresent === "true";

    // Find the user and the subject attendance document
    const user = await User.findById(userId);
    const subjectAttendance = user.attendance.find(
      (attendance) => attendance.subject.toString() === subjectId
    );

    if (subjectAttendance) {
      // Update the presentCount or absentCount based on isPresent value
      if (isPresent) {
        subjectAttendance.presentCount++;
      } else {
        subjectAttendance.absentCount++;
      }

      // Save the updated user document
      await user.save();
      res.status(200).json({ message: "Attendance marked successfully" });
    } else {
      res.status(404).json({ message: "Subject attendance not found" });
    }
  } catch (error) {
    console.error("Error marking attendance:", error);
    res
      .status(500)
      .json({ message: "An error occurred while marking attendance" });
  }
};

module.exports = {markAttendance,renderMarkAttendance};
