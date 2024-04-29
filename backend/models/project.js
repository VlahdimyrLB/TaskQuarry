const mongoose = require("mongoose");
const Feature = require("./feature"); // Import the Feature model
const { Schema } = mongoose; // Destructure Schema from mongoose

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Project Name"],
    trim: true,
    unique: true, // Ensures uniqueness of name
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  priority: {
    type: String,
    enum: ["Urgent", "Important", "Medium", "Low"],
    default: "medium",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  features: [{ type: Schema.Types.ObjectId, ref: "Feature" }], // Reference to Feature model
});

module.exports = mongoose.model("Project", ProjectSchema);
