const validator = require("validator")
const userValidator = (reqData) => {
  const { firstName, lastName, email, password } = reqData;

  if (!firstName || !lastName) return { error: "Invalid Name" };
  if (!validator.isEmail(email)) return { error: "Enter valid email" };
  if (!validator.isStrongPassword(password)) return { error: "Enter strong password" };

  return { error: null };
};

module.exports = {userValidator}