const nodemailer = require("nodemailer");
const User = require("../models/user"); // Import the User model

// In-memory storage for OTPs (for simplicity)
const otpStorage = new Map();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "studease012@gmail.com",
    pass: "vkziulynxnsafciy",
  },
});

exports.renderForgot = (req, res) => {
  res.render("forgot");
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).render("forgot", { error: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    otpStorage.set(email, otp); // Store the OTP in memory

    // Send the OTP to the provided email
    const mailOptions = {
      from: "studease012@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).render("forgot", { error: "Error sending email" });
      } else {
        res.render("verifyotp", { email });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("forgot", { error: "Internal server error" });
  }
};

exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStorage.get(email);
  if (storedOtp === parseInt(otp)) {
    res.render("resetpass", { email });
  } else {
    res.status(400).render("verifyotp", { email, error: "Invalid OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).render("resetpass", { error: "User not found" });
    }

    // Update the user's password with the new password (plain text)
    user.password = newPassword;
    await user.save();
    console.log(`Password reset successful`);
    res.status(200).render("resetpass", { email, success: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).render("resetpass", { error: "Internal server error" });
  }
};