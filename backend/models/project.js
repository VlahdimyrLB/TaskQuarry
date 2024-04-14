const mongoose = require("mongoose");
const FeatureSchema = require("./feature");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Project Name"],
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  features: [FeatureSchema],
});

module.exports = mongoose.model("Project", ProjectSchema);
