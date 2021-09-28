const User = require("../models/user")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const expressJwt = require('express-jwt')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession= require('cookie-session');


const JWT_SECRET ="sshhhh"

exports.googleSignin=async (req,res)=>{
    const { googleId } = req.body;
    let oldUser = await User.findOne({ googleId });
    if (!oldUser) 
      {
          oldUser = await User.create(req.body);
      }        
   // console.log(oldUser)

    const token = jwt.sign({_id : oldUser._id},JWT_SECRET)
    res.cookie("token",token,{expire : new Date() + 999});
    const {_id,name,email,role,profileimage,mobile,address} =oldUser;
    return res.json({token,user : {_id,name,email,role,profileimage}}) 
}
 

exports.signout = (req,res)=>{
    req.logout();
    res.clearCookie("token")
    res.redirect("/");

}

// protected routes
exports.isSignedIn = expressJwt({
     secret: JWT_SECRET,
     algorithms: ['HS256'],
     userProperty : "auth" 
    // setting properties in user browser using cookies     
});

// custom middlewares
exports.isAuthenticated = (req,res,next)=>{
    let permission = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!permission){
      return res.status(403).json({
          error : "ACCESS DENIED"
      })
    }
    next();
}
// 0-> user , 1->admin
exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0) return res.status(403).json({
        error : "Not Admin, ACCESS DENIED"
    })
    next();
}