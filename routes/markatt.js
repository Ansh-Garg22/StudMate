const express = require("express");
const router = express.Router();
const {markAttendance,renderMarkAttendance} = require("../controllers/markAttedence");

// Route for rendering the mark attendance page for a specific subject
router.get("/:subjectId", renderMarkAttendance);

// Route for handling mark attendance form submission
router.post("/", markAttendance);

module.exports = router;