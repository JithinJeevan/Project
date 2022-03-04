const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Register = require('./model/registerModel');
const Allocation = require('./model/allocationModel');
const bcrypt = require('bcrypt');
const path = require('path');


const app = express();
const port = 6233;
let refreshTokens = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb+srv://Jithin_88jeevan:071263%40Jj@cluster0.x0rbw.mongodb.net/ourProject?retryWrites=true&w=majority');
app.use(  (req, res,next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET', 'POST', 'PUT', 'DELETE');
    res.setHeader("Access-Control-Allow-Headers",'X-Requested-With,content-type');
    res.setHeader("Access-Control-Allow-Credentials",true);
    next();
});

// API for refresh token verification and new refrsh and access token generation
app.post("/api/refresh", (req, res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token;
  
    //send error if there is no token or it's invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    //if everything is ok, create new access token, refresh token and send to user
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
  
      refreshTokens.push(newRefreshToken);
  
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  
    
  });
  
  // Access token generating function
  const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "mySecretKey", {
      expiresIn: "30s",
    });
  };
  
  // Refresh token generating function
  const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, "myRefreshSecretKey");
  };

// User Registration or Enrollment API
  app.post('/api/register',async(req,res)=>{

    try {

      var data = req.body.formValues;
      var info = req.body.course;
      console.log(data);
      console.log(data.username);
      console.log(info);
      // Checking username or email exists in DB
    var details = await Register.find({username:data.username});
    var email = await Register.find({email:data.email});
    console.log(email);
    console.log(details);


    if ((email.length==0) && (details.length==0)&&(data.password!==""
    && data.username!=="" && data.email!=="")) {

      // For RegisterID -Random number creation between 1 and 1000
      var digits=Math.floor((Math.random() * 1000) + 1);
      
      // Skill into array
      var skillset= data.skill.split(",");
      
      // RegisterID Creation - with 4 digits random number with zero as prefix
      var userid=data.fname.charAt(0)+"ICTAK"+data.sname.charAt(0)
      +digits.toString().padStart(4,'0'); 

      console.log(userid);
      
      // Adding user data to the collection Register with password hashing
        var user = new Register({email:data.email,password: bcrypt.hashSync
        (data.password,10),fname:data.fname,sname:data.sname,
        username:data.username,registerid:userid,quali:data.quali,
        mobile:data.mobile,skill:skillset,course:info,approval:req.body.approval});

        console.log(user);
        var result = await user.save();
        var allocatedUser= new Allocation({username:data.username,registerid:userid});
        var list = await allocatedUser.save();
        res.json({status:"Success"});
        
    } 
   
    else {
        res.send("Username or Email already exists");
    }
  
      
    }
    catch (error) {

      res.json({status:"Error"});
      
  }
});


      
      // Login API

app.post("/api/login",async (req, res) => {

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  if(username!="" &&  password !=""){
    const user =await Register.findOne({username: username});
    console.log(user);
  if(user!=null){ 
    const passwordChecker = await bcrypt.compare(password,user.password);
    console.log(passwordChecker);
    if ( user.approval==true && passwordChecker) {
      //Generate an access token & Refresh token - Calling functions
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
    
      // Adding refresh token to the array as temperory
      refreshTokens.push(refreshToken);
      res.json({
        username: user.username,
        id:user.id,
        accessToken,
        refreshToken,
      });
    } 
      else if( user.approval==false && passwordChecker) {
      res.json("Approval Pending!");
    }
      else{
        res.json("Invalid Credentials!");
      }
    
      }
      else{
        res.json("Invalid Credentials")
      }
    }

  else{
    res.json("type password or username");
  }
      
  

    
  });

  // Verifying Access token for protected APIs
  const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      // Authheader contains Bearer and Acces token in the array
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, "mySecretKey", (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
  
        req.user = user;
        console.log(req.user);
        next();
      });
    } else {
      res.status(401).json("You are not authenticated!");
    }
  };

// Logout API and removing refresh token from the array refreshTokens
  app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
  });
  
  app.post("/api/trainees", verify, async (req, res) => {
    var userDetails= await Register.find({approval:false}).sort({_id:1});
    var details = {fname:userDetails.fname,sname:userDetails.sname,
    course:userDetails.course,skill:userDetails.skill,email:userDetails.email,
    registerid:userDetails.registerid}
    res.send(details);
  });



app.listen(port, () => {
    console.log("Listening on port "+port);
});