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
  password:{
    type:String,
    validate(value){
     if(!validator.isStrongPassword(value)){
      throw new Error("Please Enter Strong Password");
     }
    }
  },
  contact: {
    type: Number,
  },
  skills:{
    type:[String]
  },
  photoUrl:{
    type:String,
    default:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
    validate(value){
      if(!validator.isURL(value)){
         throw new Error("Invalid image url");
      }
    }
  }
},{timestamps:true});

const User = mongooes.model("User", userSchema);
module.exports = User;
