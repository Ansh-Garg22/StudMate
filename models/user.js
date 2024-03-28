const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNo: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    semester: { type: String, required: true },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject" }],
    attendance: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject" },
        presentCount: { type: Number, default: 0 },
        absentCount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;