const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
// Handling Uncaught Exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Error`);
    process.exit(1);
})

// config 
const port = dotenv.config({path:"backend/config/config.env"});

// connecting to database 
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// unhandled Promise Rejection when server crash means server url going to wrong.
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
})