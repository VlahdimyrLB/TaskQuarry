const mongoose = require("mongoose");
const Feature = require("./feature"); // Import the Feature model
const { Schema } = mongoose; // Destructure Schema from mongoose

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Project Name"],
    trim: true,
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  priority: {
    type: String,
    enum: ["urgent", "important", "medium", "low"],
    default: "medium",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  features: [{ type: Schema.Types.ObjectId, ref: "Feature" }], // Reference to Feature model
});

module.exports = mongoose.model("Project", ProjectSchema);
