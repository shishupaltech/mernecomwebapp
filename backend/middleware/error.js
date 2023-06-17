const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success:false,
        // error:err you can show the error or you can see the whole stack of error by using this line 
        // error:err.stack
        message:err.message
    })
}