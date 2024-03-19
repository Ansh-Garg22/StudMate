const express = require("express");
const { logoutfunc } = require("../controllers/user");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const user = req.user;
  return res.render("home", { name: user.name });
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
