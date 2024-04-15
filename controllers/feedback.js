const nodemailer = require("nodemailer");
require("dotenv").config();

exports.submitFeedback = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "studease012@gmail.com",
      pass: "vkziulynxnsafciy",
    },
  });

  const { name, email, rating, subject, comments } = req.body;

  const mailOptions = {
    from: {
      name: "Teacher Feedback Mail",
      address: "id",
    },
    to: email,
    subject: subject,
    text: `Name: ${name}\nRating: ${rating}\nComments: ${comments}`,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  };

  try {
    await sendMail(transporter, mailOptions);
    res.send("<script>window.onload = () => { clearForm(); }</script>Feedback submitted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting feedback");
  }
};
