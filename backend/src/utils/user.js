const validator = require("validator");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const userValidator = (reqData) => {
  const { firstName, lastName, email, password } = reqData;

  if (!firstName || !lastName) return { error: "Invalid Name" };
  if (!validator.isEmail(email)) return { error: "Enter valid email" };
  if (!validator.isStrongPassword(password))
    return { error: "Enter strong password" };

  return { error: null };
};

const userAuth = async (req, res, next) => {
  const cookie = req.cookies;
  const { token } = cookie;
  if (!token) {
    return res.status(401).json({ mess: "Please login !" });
  } else {
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodeToken;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  }
};

const userEditData = async (req) => {
  const editAllowedFields = [
    "firstName",
    "lastName",
    "age",
    "contact",
    "skills",
    "photoUrl",
  ];
  const isEditUserData = Object.keys(req.body).every((field) =>
    editAllowedFields.includes(field)
  );
  return isEditUserData;
};

module.exports = { userValidator, userAuth, userEditData };
