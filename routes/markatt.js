const express = require("express");
const router = express.Router();
const {
  markAttendance,
  renderMarkAttendance,
} = require("../controllers/markAttedence");
const deleteAttendanceRecord=require("../controllers/deleteRecord")
// Route for rendering the mark attendance page for a specific subject
router.get("/:subjectId", renderMarkAttendance);

// Route for handling mark attendance form submission
router.post("/", markAttendance);

router.delete("/deleteAttendanceRecord/:recordId",deleteAttendanceRecord);

module.exports = router;
