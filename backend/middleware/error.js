const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb Id error that is called the cast error 
    if(err.name ==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }


    // mongoose duplicate key error 
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400)
    }

    // Wrong JWT error 
    if(err.code === "jsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message,400)
    }
    // Wrong JWT Expire Error
    if(err.code === "TokenExpiredError"){
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success:false,
        // error:err you can show the error or you can see the whole stack of error by using this line 
        // error:err.stack
        message:err.message
    })
}