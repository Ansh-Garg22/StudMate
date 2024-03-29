const User = require("../models/user");

const deleteAttendanceRecord = async (req, res) => {
  try {
    const userId = req.user._id;
    const recordId = req.params.recordId;

    // Find the user and remove the attendance record from the records array
    const user = await User.findOne({
      _id: userId,
      "attendance.records._id": recordId,
    });
    if (!user) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const subjectAttendance = user.attendance.find((attendance) =>
      attendance.records.some((record) => record._id.toString() === recordId)
    );

    if (subjectAttendance) {
      const record = subjectAttendance.records.find(
        (record) => record._id.toString() === recordId
      );
      subjectAttendance.records.pull(record);

      // Update the presentCount or absentCount based on the deleted record
      if (record.present) {
        subjectAttendance.presentCount--;
      } else {
        subjectAttendance.absentCount--;
      }

      // Save the updated user document
      await user.save();
      res
        .status(200)
        .json({ message: "Attendance record deleted successfully" });
    } else {
      res.status(404).json({ message: "Subject attendance not found" });
    }
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the attendance record",
      });
  }
};

module.exports = deleteAttendanceRecord ;
