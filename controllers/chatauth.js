// controllers/authController.js
const User = require("../models/user");
const { setUser } = require("../service/auth");

exports.login = async function (req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("chatlogin", {
      error: "Invalid User",
    });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/chatting");
};

exports.chatlogoutfunc = async function (req, res) {
  res.cookie("uid", "", { maxAge: 1 });
  res.redirect("/chatlogin");
};
