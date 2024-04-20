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
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Feedback</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container {
          color:white;
          max-width: 600px;
          margin: 20px auto;
          background-color: #31363F;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .feedback-item {
          margin-bottom: 10px;
        }
        .feedback-item strong {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>New Feedback Received</h2>
        <div class="feedback-box">
          <div class="feedback-item">
            <strong>Name:</strong> ${name}
          </div>
          <div class="feedback-item">
            <strong>Rating:</strong> ${rating}
          </div>
          <div class="feedback-item">
            <strong>Comments:</strong> ${comments}
          </div>
        </div>
      </div>
      <p>If you did not initiate this request, please ignore this email and contact our support team immediately.</p>
      <script>
      function clearForm() {
        // Your code to clear the form fields
      }
  
      function redirectToFeedbackPage() {
        setTimeout(() => {
          window.location.href = '/feedback'; // Replace with your feedback site URL
        }, 5000); // 5 seconds (5000 milliseconds)
      }
  
      document.addEventListener('DOMContentLoaded', () => {
        clearForm();
        redirectToFeedbackPage();
      });
    </script>
    </body>
    </html>`,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Feedback submitted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting feedback");
  }
};
