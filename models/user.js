const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Should throw an error if the username is already in database ???
  },
  password: {
    type: String,
    required: true,
  },
  membership_status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
