const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  name: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "subject" }],
});

const Semester = mongoose.model("semester", semesterSchema);

module.exports = Semester;
