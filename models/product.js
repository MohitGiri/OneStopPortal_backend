const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({

    name:{
        type : String,
        trim : true,
        required : true,
        maxlength : 1000
    },
    description: {
        type : String,
        trim : true,
        required : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        trim : true,
        required : true,
        maxlength : 32
    },
    category : {
        type : ObjectId,
        ref : "Category",
        required : false
    },
    stock :{
        type : Number,
        default : 0
    },
    sold:{
       type : Number,
       default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    },
    summary:{
        type:String,
        required:false,
        default:""
    },
    like:{
        type:Array,
        default:[],
    },
    review:[{
        user:{type : ObjectId,ref : "User"},
        stars:{type:Number,default:-1,required:false},
        comment:{type:String,required:false}
    }],
},{timestamps : true})


module.exports = mongoose.model("Product",productSchema);