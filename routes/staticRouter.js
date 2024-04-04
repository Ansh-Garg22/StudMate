const express = require("express");
const { logoutfunc } = require("../controllers/user");
const  chatlogout  = require("../controllers/chatauth");

const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("../middlewares/auth");

const renderDashboard = require("../controllers/Dashboard");

const router = express.Router();

router.get("/",renderDashboard);
router.get("/signup", (req, res) => {
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

router.get("/logout", logoutfunc);
router.get("/chatlogout", chatlogout.chatlogoutfunc);
router.get("/feedback", restrictToLoggedinUserOnly, (req, res) => {
  return res.render("feedback");
});
module.exports = router;
