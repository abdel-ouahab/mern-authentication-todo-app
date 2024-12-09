const {Schema , model} = require("mongoose")

const UserSchema = new Schema({
    firstname:{
        type : String ,
        required : true
    },
    lastname:{
        type : String ,
        required : true
    },
    username:{
        type : String ,
        required : true,
        unique : true
    },
    age: {
        type: Number,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required : true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const UserModel = model("Users", UserSchema)
module.exports = UserModel