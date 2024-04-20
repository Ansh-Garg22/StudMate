const express = require("express");
const { logoutfunc } = require("../controllers/user");
const  chatlogout  = require("../controllers/chatauth");

const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("../middlewares/auth");

const renderDashboard = require("../controllers/Dashboard");
// Route to get student details
const router = express.Router();

router.get("/",renderDashboard);


router.get("/signup", (req, res) => {
  return res.render("logsi");
});

router.get("/login", (req, res) => {
  return res.render("logsi");
});
router.get("/login", (req, res) => {
  return res.render("logsi");
});

router.get("/chatlogin", (req, res) => {
  return res.render("chatlogin");
});

router.get("/contact", (req, res) => {
  return res.render("contactus");
});
router.get("/team", (req, res) => {
  return res.render("team");
});

router.get("/logout", logoutfunc);
router.get("/chatlogout", chatlogout.chatlogoutfunc);
router.get("/feedback", restrictToLoggedinUserOnly, (req, res) => {
  const userId = req.user._id;
  // Render the feedback page and pass the user ID to it
  return res.render("feedback", { userId: userId });
});
module.exports = router;
