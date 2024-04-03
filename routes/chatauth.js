const express = require("express");
const router = express.Router();
const authController = require("../controllers/chatauth");

router.post("/login", authController.login);

module.exports = router;
