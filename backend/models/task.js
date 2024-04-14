const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", TaskSchema);
