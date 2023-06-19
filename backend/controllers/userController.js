const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Registration a user 

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl"
        },
    });
    sendToken(user,2001,res);

});

// login User 

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;
    

    // checking if user has given password and email both 

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));

        
    }
    const user =await User.findOne({email}).select("+password");//+(plus password means password can get because we given false that's why we add + to access the password)
 
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));

    }

    const isPasswordMatched = user.comparePassword(password);

    if(isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));

    }
    sendToken(user,401,res);
});

// logout User 
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
})