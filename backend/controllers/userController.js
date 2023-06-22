const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");

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
    sendToken(user,201,res);

});

// login User 

exports.loginUser = catchAsyncErrors(async (req,res,next)=>{
    const {email,password} = req.body;
    // console.log(email+ "and " + password);
    

    // checking if user has given password and email both 

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));

        
    }
    const user =await User.findOne({email}).select("+password");//+(plus password means password can get because we given false that's why we add + to access the password)
    // console.log(user);
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));

    }

    const isPasswordMatched = await user.comparePassword(password);


    if(!isPasswordMatched){
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

// Forgat Password 

exports.forgatPasswrod = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //Get ResetPassword Token 
    const resetToken =  user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl =  `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it`;
    try{
        await sendEmail({
            email:user.email,
            subject:`Ecommerce password Recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(err.message,500));
    }

});


// Reset Password 
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    
    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")// this is the algorithms 
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},

    });

    if(!user){
        return next(new ErrorHandler("Reset password Token is invalid or has been expired", 400));

    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password",400));

    }

    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    sendToken(user,200,res);
});

// Get User Detail 
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.user.id);
   

    res.status(200).json({
        success:true,
        user,
    })
});

// update User password 
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    console.log("yes i am in updatePassword");
    const user = await User.findById(req.user.id).select("+password");
    console.log(user);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    console.log(isPasswordMatched);


    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("passowrd does not matched",400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res);

    
})