const express = require("express");
const { logoutfunc } = require("../controllers/user");
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
router.get("/logout", logoutfunc);
router.get("/feedback", restrictToLoggedinUserOnly, (req, res) => {
  return res.render("feedback");
});
module.exports = router;
