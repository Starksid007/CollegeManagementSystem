import React, { useCallback } from 'react'
import "../styles/Login.css";
import { useState } from 'react';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = (props) => {

  const notify = (isError, message) => {
    if(isError)
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
    });
    else 
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
  });
};
  const post = (e) => {
    if(enteredPassword=="12345" && enteredUsername=="starksid"){
      e.preventDefault();
      notify(false, "Congrats");
      setTimeout(()=>notify(false, "authenticating your details..."),2500)
      // setTimeout(()=>notify(false, "preparing environment for you"),3500)
      // setTimeout(()=>notify(false, "you are almost there, thank you for waiting with us"),6500)
      setTimeout(()=>navigate("/studentDashboard"),5000)
    }
    else{
    e.preventDefault();
    notify(true,"Wrong Username or Password");
    setTimeout(()=>notify(true,`Are you sure you are ${enteredUsername}?`),2500)
  }

}
const navigate=useNavigate();
const [enteredUsername,setEnteredUsername]=useState("");
const [enteredPassword,setEnteredPassword]=useState("");
  return (
    <div id="card">
    <div id="card-content">
      <div id="card-title">
        <h2>LOGIN</h2>
        <div className="underline-title"></div>
      </div>
      <div className="select">
   <select name="format" id="format">
      <option value="Student">Student</option>
      <option value="Professor">Professor</option>
      <option value="Dean">Dean</option>
   </select>
</div>
<br></br>
      <form onSubmit={post} class="form">
        <label for="user-email">
            &nbsp;Username
          </label>
        <input id="user-email" className="form-content" type="text" value={enteredUsername} onChange={(e)=>setEnteredUsername(e.target.value)} name="username" autocomplete="on" required />
        <div className="form-border"></div>
        <label for="user-password">&nbsp;Password
          </label>
        <input id="user-password" className="form-content" type="password" value={enteredPassword} onChange={(e)=>setEnteredPassword(e.target.value)} name="password" required />
        <div className="form-border"></div>
        <input id="submit-btn" type="submit" name="submit" value="LOGIN"/>
      </form>
      <ToastContainer autoClose={2000}/>
    </div>
  </div>
  )
}
export default Login;