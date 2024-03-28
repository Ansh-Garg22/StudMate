const User = require("../models/user");
const markAttendance = async (req, res) => {
    try {
      const userId = req.user._id;
      const subjectId = req.body.subjectId;
      const isPresent = req.body.isPresent; // Assuming you receive the isPresent value from the request body
      const currentDate = new Date();
  
      // Find the user and the subject attendance document
      const user = await User.findById(userId);
      const subjectAttendance = user.attendance.find(
        (attendance) => attendance.subject.toString() === subjectId
      );
  
      if (subjectAttendance) {
        // Create a new attendance record for the current date
        const newRecord = {
          date: currentDate,
          present: isPresent,
        };
  
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
        res.status(200).json({ message: 'Attendance marked successfully' });
      } else {
        res.status(404).json({ message: 'Subject attendance not found' });
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ message: 'An error occurred while marking attendance' });
    }
  };
  
  module.exports = markAttendance;
  