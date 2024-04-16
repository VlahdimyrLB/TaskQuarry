const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose

const FeatureSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must Provide Feature Name"],
  },
  description: {
    type: String,
  },
  startDate: Date,
  endDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Use mongoose.Schema.Types.ObjectId
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Reference to Task model
});

module.exports = mongoose.model("Feature", FeatureSchema);
