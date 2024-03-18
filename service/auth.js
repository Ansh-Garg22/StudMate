const jwt = require("jsonwebtoken");
const secret = "ansh$1234";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secret
  );
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error while decoding JWT:", error.message);
    return null;
  }
}
module.exports = {
  setUser,
  getUser,
};
