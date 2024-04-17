const express = require("express");
const router = express.Router();
const {
  editStudentDetails,
  updateStudentDetails,
} = require("../controllers/editdetails");
const studentController = require('../controllers/userprofile');

// Route to render the edit student details form
router.get("/:id/edit", editStudentDetails);

// Route to handle the update student details form submission
router.post("/:id/update", updateStudentDetails);

router.get('/:id', studentController.getStudentDetails);
module.exports = router;