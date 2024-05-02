const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeatureSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must Provide Feature Name"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Not Yet Started", "In Progress", "Done"],
    default: "Not Yet Started",
  },
  dueDate: {
    type: Date,
    default: null,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  parentProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Reference to the Project model
  },
  tasks: [
    {
      name: String,
      description: String,
      isDone: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Feature", FeatureSchema);
