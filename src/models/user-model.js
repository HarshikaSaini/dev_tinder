const mongooes = require("mongoose");
const validator = require("validator");
const userSchema = new mongooes.Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email id");
      }
    },
  },
  contact: {
    type: Number,
  },
});

const User = mongooes.model("User", userSchema);
module.exports = User;
