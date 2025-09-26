const mongooes = require("mongoose")
const connectionRequestSchema = new mongooes.Schema({
    fromUserId:{
        type:mongooes.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongooes.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }   
},{timestamps:true})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",function(next){
    if(this.fromUserId.equals(this.toUserId)){
       return next(new Error("cannot sent request to yourself"));
    }
    next();
})

const ConnectionRequestModel = new mongooes.model("ConnectionRequestModel",connectionRequestSchema);

module.exports=ConnectionRequestModel