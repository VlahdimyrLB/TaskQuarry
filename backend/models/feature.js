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
  status: {
    type: String,
    enum: ["Not Yet Started", "Ongoing", "Done"],
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
  }, // Use mongoose.Schema.Types.ObjectId
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
