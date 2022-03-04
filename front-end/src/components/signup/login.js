import React, { useEffect, useState } from 'react';
// import './Login.css';

import axios from 'axios';

import {Link, AppBar, Toolbar, Typography } from '@mui/material';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import '../signup/Login.css';

function Login(props) {

    var [loginValues,setloginValues] = useState([]);

    

// Storing Form Field Values
var [formValues, setFormValues] = useState({ username: "",password: "" });

// Manage Form Error Values
const navigate = useNavigate();

// Flag for Form Submission Status
var [isSubmit, setIsSubmit] = useState(false); 


 






// Manage Field Change
  const  handleChange = (event) => {
    // console.log(event.target);
    const { name, value } = event.target; //destructuring
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
}

console.log(formValues);
const id = loginValues.id;
   
    var username =  loginValues.username;
useEffect(()=>{
    redirected();

},[loginValues])
// Manage Form Refresh
 const handleSubmit =  async (event) => {
    event.preventDefault();
    
  await  axios.post('http://localhost:6233/api/login',formValues).then((response)=>{

        setloginValues(response.data);
        console.log("data",response.data);
       
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        Cookies.set("access", accessToken);
        Cookies.set("refresh", refreshToken);
        
});
     
       
        setFormValues({ username: "",password: "" });
    
  
       
}

// function  fetch(){
    
//   }

console.log("login",loginValues.accessToken);

console.log("use",loginValues.username);

 function redirected(){  
    
//    console.log(formValues.username);
//    console.log(username);
console.log("full",loginValues.id);
   if( loginValues.id=="621c90a152ec1005d7ca5645") {
       
      navigate(`/admin/${loginValues.id}`,{replace:true});
      console.log("Admin Login");
   }
 else  if(  formValues.username===username) {
       
       navigate("#",{replace:true});
       console.log("user login");
    }

   
   else
   {  navigate("#",{replace:true});
   console.log("Invalid login");
}
}




  

      
        
    
// async   function  login(){

//         axios.post('http://localhost:5001/api/login',formValues)
//         .  then((response)=>
//         {
//             console.log(response.data);
//              setloginValues(response.data);
            
            
//         })

        
    
//     }




    
    return (
        <div>
           
            {/* { (isSubmit &&  isAuth) ?(<Header Values={loginValues}/>):<pre className='pretext'>Invalid Login Credentials</pre>} */}
            
            <div className="">
                <form onSubmit={handleSubmit}>
                <label for="chk" aria-hidden="true">Sign In</label>
                        <input type="text" name="username" placeholder="User name" required="" value={formValues.username} onChange={handleChange} />
                        
                        
                        <input type="password" name="password" placeholder="Password" required="" value={formValues.password} onChange={handleChange} />
                        { isSubmit &&  loginValues.status==="Authentication failed" ?(<h3>Invalide credentials</h3>):(<h3></h3>)}
                        <button>Sign In</button>
                </form>
            </div>
            <Link href="/" className='loginlink'>Sign Up</Link> 
        </div>
       
    );
}

export default Login;