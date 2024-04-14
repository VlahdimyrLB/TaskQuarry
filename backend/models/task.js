const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  name: String,
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = TaskSchema;
// mongoose.model("Task", TaskSchema);
