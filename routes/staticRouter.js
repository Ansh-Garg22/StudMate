const express = require("express");
const { logoutfunc } = require("../controllers/user");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("../middlewares/auth");
const Subject = require("../models/subject"); // Import the Subject model
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");

    const userId = req.user._id;

    // Find the user by ID
    const user = await User.findById(userId).populate("attendance.subject");
    console.log(user);
    // Populate the attendance field with subject details

    // Render the Dashboard EJS template with user's name and subject details
    return res.render("Dashboard", {
      name: user.name,
      subjects: user.attendance[0],
    });
  } catch (error) {
    console.error("Error rendering dashboard:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("logsi");
});

router.get("/login", (req, res) => {
  return res.render("logsi");
});
router.get("/logout", logoutfunc);
router.get("/feedback", restrictToLoggedinUserOnly, (req, res) => {
  return res.render("feedback");
});
module.exports = router;
