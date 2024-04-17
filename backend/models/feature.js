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
  isDone: {
    type: Boolean,
    default: false,
  },
  startDate: Date,
  endDate: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Use mongoose.Schema.Types.ObjectId
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
