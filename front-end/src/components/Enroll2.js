import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import validation from './validation';
import axios from 'axios';

function Enroll2(props) {

    var allCourses= [
        {value:'first',label:'Cyber Security'},
        {value:'second',label:'FSD'},{value:'third',label:'AI'}];

         // Storing Form Field Values
    var [formValues, setFormValues] = useState({ username: "",fname: "",sname: "", email: "",
                                               password: "",mobile:"",skill:'' ,quali:"",});
    
    var [course,setCourse]=useState(null);
    
    var approval=false;
    

    // Manage Form Error Values
    const [formErrorValues, setFormErrorValues] = useState({});
    var [Values, setValues] = useState();

    // Flag for Form Submission Status
    const [isSubmit, setIsSubmit] = useState(false); 

    console.log(formValues);
    console.log(course);
    
    // Manage Field Change
    const  handleChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target; //destructuring
        setFormValues({ ...formValues, [name]: value });
        // console.log(formValues);
        
    }

    // const courseHandler=(event)=>{
    //   setCourse(event.label);

    // }
    // Array.isArray(event)?event.map(x=>x.label):[]

    // Manage Form Refresh
    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrorValues(validation(formValues));
        setIsSubmit(true);
        console.log(Values);
        
    }

    useEffect(() => {
         
            register();
        
    }, [formErrorValues]);

    function register(){

        
            axios.post('http://localhost:6233/api/register',{formValues,course,approval})
            .then((response)=>
            {
              console.log(response.data);
              
                setValues(response.data);
              
                
        
            })

          }
          
    return (
      
  <>
  <div>
  <h1 id="title">
  Trainee Enroll Form
</h1>
<p id="description">
  Enter the required data.
</p>
  
</div>
<div >
  
  <form id="survey-form" onSubmit={handleSubmit}>
    <label id="name-label">Name</label><br/>
      <input type="text" id="name" onChange={handleChange} name="fname" value={formValues.fname} className="form" required placeholder="First name"/>
      <input type="text" id="name" onChange={handleChange} name="sname" value={formValues.sname} className="form" required placeholder="Last name"/>
      <br/> 
    <label id="username-label">Username</label>
      <input type="text" id="username" onChange={handleChange}  name="username" value={formValues.username} className="form" required placeholder="Insert your username"/><br/>
      <label id="password-label">Password</label>
      <input type="password" id="password" onChange={handleChange} name="password" value={formValues.password} className="form" required placeholder="Insert your password"/><br/>
      <label id="email-label">Email</label>
      <input type="email" id="email" onChange={handleChange} name="email" value={formValues.email} className="form" required placeholder="Insert your email"/><br/>
      <label id="mobile-label">Mobile</label>
      <input type="number" id="number-label" onChange={handleChange} name="mobile" value={formValues.mobile} className="form" required placeholder="Insert your mobile number"/><br/>
    <label id="qualify">Qualification</label>
      <input type="text" id="qualification" onChange={handleChange} name="quali" value={formValues.quali} className="form" placeholder="Qualification"  required/><br/>
    <label id="course">Courses</label>
   {
    <Select className='drop' options={allCourses} isMulti onChange={setCourse}  />
   }
    <br/>
    <label id="skill-label">Skills</label>
    <textarea name='skill' onChange={handleChange} value={formValues.skill}></textarea>
    
    
    <input type="submit" id="submit" name="submit" value="Submit"/>
    
  </form>
  
</div>
           
</> 
        
    );
}

export default Enroll2;