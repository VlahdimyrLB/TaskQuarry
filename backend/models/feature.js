const mongoose = require("mongoose");
const TaskSchema = require("./task");
const Schema = mongoose.Schema;

const FeatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Feature Name"],
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  tasks: [TaskSchema],
});

module.exports = FeatureSchema;
// in this setup I need to do this in controller mongoose.model("Feature", FeatureSchema);
