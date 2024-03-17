// const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
// const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, rollNo, password } = req.body;
  await User.create({
    name,
    email,
    rollNo,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, rollNo, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email, rollNo, password });

  console.log("User found:", user); // Log the user object

  if (!user)
    return res.render("logsi", {
      error: "Invalid User",
    });

  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
