const mongoose = require("mongoose");
const FeatureSchema = require("./feature");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Project Name"],
    trim: true,
    unique: true, // not working
    index: true, // not working
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  features: [FeatureSchema],
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
