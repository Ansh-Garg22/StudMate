const express = require("express");


const router = express.Router();

router.get("/", async (req, res) => {
//   if (!req.user) return res.redirect("/login");
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("logsi");
});

router.get("/login", (req, res) => {
  return res.render("logsi");
});

module.exports = router;