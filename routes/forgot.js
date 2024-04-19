const express = require('express');
const router = express.Router();
const forgotP = require('../controllers/forgot');

// Route to handle forgot password request
router.get('/', forgotP.renderForgot);

// Route to handle OTP generation and sending
router.post('/send-otp', forgotP.sendOTP);

// Route to handle OTP verification
router.post('/verify-otp', forgotP.verifyOTP);

// Route to handle password reset
router.post('/reset-password', forgotP.resetPassword);

module.exports = router;