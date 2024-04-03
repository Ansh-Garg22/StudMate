const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  present: { type: Boolean, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rollNo: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  isAlumni: { type: Boolean, default: false }, 
  semester: { type: String, required: function() { return !this.isAlumni; } }, // Make semester required only for non-alumni
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject", required: function() { return !this.isAlumni; } }], // Make subjects required only for non-alumni
  attendance: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: function() { return !this.isAlumni; } },
      presentCount: { type: Number, default: 0 },
      absentCount: { type: Number, default: 0 },
      records: [attendanceRecordSchema],
    },
  ],
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
module.exports = User;
