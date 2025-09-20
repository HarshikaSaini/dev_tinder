const mongooes = require("mongoose")
const userSchema = new mongooes.Schema({
    firstName: {
        type:String
    },
    lastName: {
        type:String
    }
})

const User = mongooes.model("User",userSchema)
module.exports = User