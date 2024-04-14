const mongoose = require("mongoose");
const TaskSchema = require("./task");

const FeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Project Name"],
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  subTasks: [TaskSchema],
});

module.exports = mongoose.model("Feature", FeatureSchema);
