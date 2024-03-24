const Subject = require("../models/subject");

async function handleSubjectCreation(req, res) {
  const { name, code, semester } = req.body;

  try {
    // Create a new subject with the provided semester name
    const subject = await Subject.create({ name, code, semester });

    return res.status(201).json({ success: true, subject });
  } catch (error) {
    console.error("Error creating subject:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

module.exports = {
  handleSubjectCreation,
};
