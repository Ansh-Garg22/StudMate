const Subject = require("../models/subject");
const User = require("../models/user");

const renderMarkAttendance = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const userId = req.user._id;

    // Find the subject by ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).send('Subject not found');
    }

    // Find the user by ID and populate the attendance field with subject details
    const user = await User.findById(userId).populate({
      path: 'attendance.subject',
      model: 'Subject',
      select: 'name',
    });

    // Find the attendance record for the specified subject
    const subjectAttendance = user.attendance.find(
      (attendance) => attendance.subject._id.toString() === subjectId
    );

    if (!subjectAttendance) {
      return res.status(404).send('Subject attendance not found');
    }

    // Render the markAttendance.ejs file with the subject details and attendance records
    res.render('markAtt', {
      userId,
      subject: {
        _id: subject._id,
        name: subject.name,
        records: subjectAttendance.records,
      },
    });
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).send('Internal Server Error');
  }
};

const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const subjectId = req.body.subjectId;
    const isPresent = req.body.isPresent === "true";
    const currentDate = new Date();

    // Find the user and the subject attendance document
    const user = await User.findById(userId);
    const subjectAttendance = user.attendance.find(
      (attendance) => attendance.subject.toString() === subjectId
    );

    if (subjectAttendance) {
      // Create a new attendance record
      const newRecord = { date: currentDate, present: isPresent };

      // Add the new record to the records array
      subjectAttendance.records.push(newRecord);

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
module.exports = { markAttendance, renderMarkAttendance };
