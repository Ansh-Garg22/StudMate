const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const name = req.user.name;
  return res.render("home", { name });
});

router.get("/signup", (req, res) => {
  return res.render("logsi");
});

router.get("/login", (req, res) => {
  return res.render("logsi");
});

module.exports = router;
