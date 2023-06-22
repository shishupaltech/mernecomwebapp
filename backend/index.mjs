import express from 'express'
// import { db } from './config/connection.mjs'

// import docxConverter from "docx-pdf";
// import session from 'express-session'

// import MySQLStore from 'express-mysql-session';

// var nodemailer = require('nodemailer');
import nodemailer from "nodemailer";

// const MySqlStore = MySQLStore(session);

const app= express()

// const userData = {
//     fullname: "Ricardo Arbois",
//     username: "ricky",
//     password: 12345
// };

app.use(express.json({}))
app.use(express.urlencoded(
    {
        extended: true
    }
))




// var sessionStore = new MySQLStore({
//     expiration: 10800000,
//     createDatabaseTable: true,
//     schema:{
//         tableName: 'sessiontbl',
//         columnNames:{
//             session_id: 'sesssion_id',
//             expires: 'expires',
//             data: 'data'
//         }
//     }
// },db)

// app.use( session({
//     key: 'keyin',
//     secret: 'my secret',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: true
// }))



// app.use('/login',function(req,res){
//     const { username , password} = req.body
//     if(username != userData.username || password != userData.password){
//         return res.status(401).json({
//              errror: true,
//              message: "Username or Password is invalid"
//         })
//     }
//     else{
//         req.session.userinfo = userData.fullname
//         res.send("Landing success!")
//     }
// })

// app.use('/logout', function(req,res){
//     req.session.destroy(function(err){
//         if(!err){
//             res.send("Log Out!")
//         }
//     })
// })



app.use('/', function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codeshishupal@gmail.com',
      pass: 'pytvalqbjdmyzqll'
    }
  });
  
  var mailOptions = {
    from: 'codeshishupal.com',
    to: 'shishupalsingh10032001@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `Hi Smartherd, thank you for your nice Node.js tutorials.
            I will donate 50$ for this course. Please send me payment options.`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})





app.listen(3000,()=>{
    console.log(3000);
})