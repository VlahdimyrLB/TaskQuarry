const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Name"],
    trim: true,
    maxlength: [20, "Name must be less than or equal 20 characters"],
    unique: true, // Ensures uniqueness of name
  },
  username: {
    type: String,
    required: [true, "Must Provide Username"],
    trim: true,
    maxlength: [20, "Username must be less than or equal 20 characters"],
    unique: true, // Ensures uniqueness of username
  },
  password: {
    type: String,
    required: [true, "Must Provide Password"],
    trim: true,
    // maxlength: [20, "Password must be less than or equal 20 characters"],
  },
  isAdmin: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  // image: {
  //   data: { type: String, required: true },
  //   contentType: { type: String, required: true },
  // },
});

module.exports = mongoose.model("User", UserSchema);
