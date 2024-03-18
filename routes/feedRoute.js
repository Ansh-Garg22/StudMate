const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/feedback");

router.post('/',submitFeedback);

module.exports = router;