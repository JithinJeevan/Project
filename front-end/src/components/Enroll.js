import {useState} from 'react';
import  './Enroll.css';
import Select from 'react-select';


function Enroll(props) {
  const [food, setFood] = useState(["Burger", "Pizza", "Sandwich"])
  var courses= [
               {value:'Cyber Security',label:'Cyber Security'},
               {value:'FSD',label:'FSD'},{value:'AI',label:'AI'}];
    
    return (
        
           <>
            <div id="container_1">
  
  <h1 id="title">
  Student Registration
</h1>
<p id="description">
  Enter the required data in the boxes.
</p>
  
</div>
<div id="container_2">
  
  <form id="survey-form">
    <label id="name-label">Name</label><br/>
      <input type="text" id="name" name="fname" className="form" required placeholder="First name"/>
      <input type="text" id="name" name="sname" className="form" required placeholder="Last name"/>
      <br/> 
    <label id="username-label">Username</label>
      <input type="text" id="username" name="email" className="form" required placeholder="Insert your username"/><br/>
      <label id="email-label">Email</label>
      <input type="email" id="email" name="email" className="form" required placeholder="Insert your email"/><br/>
      <label id="mobile-label">Mobile</label>
      <input type="number" id="number-label" name="email" className="form" required placeholder="Insert your mobile number"/><br/>
    <label id="qualify">Qualification</label>
      <input type="text" id="qualification" name="number" className="form" placeholder="Qualification"  required/><br/>
    <label id="course">Courses</label>
   {
    <Select className='drop' options={courses} isMulti/>
   }
    <br/>
    <label id="skill-label">Skills</label>
    <textarea name='skill' ></textarea>
    
    
    <input type="submit" id="submit" name="submit" value="Submit"/>
  </form>
  
</div>
           
</> 
       
            );
    


       
    
}

export default Enroll;