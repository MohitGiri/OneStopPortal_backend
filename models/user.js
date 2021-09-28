const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


var userSchema = new mongoose.Schema({
    _id :{
        type : String
     },
    profileimage:{
        type:String,
        required:false,
        default:""
    },
    name:{
        type : String,
        required:true,
        maxlength: 32,
        trim:true
    },
    lastname: {
        type:String,
        maxlength:32,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique : true
    },
    googleId : {
        type : String
    },
    userinfo :{
        type : String,
        trim : true
    },
    // encry_password : {
    //     type : String,
    //     required : true 
    // },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type : Array,
        default : [] 
    },
    cart:[{
        product:{type : ObjectId,ref : "Product"},
        quantity:{type:Number}
    }],
    mobile:{type:String,required:false,default:""},
    address:{type:String,required:false,default:""},
}, {timestamps :true});


module.exports = mongoose.model("User",userSchema);
