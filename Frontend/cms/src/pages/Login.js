import React, { useCallback, useEffect } from 'react'
import "../styles/Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ({ setShowLogin, setShowLogout, setShowChangepassword,setProfessorName,setProfessorEmail,setShowAdminLabel }) => {

  setShowLogout(false)
  setShowLogin(false)
  setShowChangepassword(false)

  const navigate = useNavigate();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("students");
  


  const getUser=(enteredUsername,enteredPassword)=>{
    fetch(`http://localhost:8080/${selectedValue}/${enteredUsername}`)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      if(res.password==enteredPassword){
        notify(false, "Congrats");
        if(selectedValue=="students"){
          setShowAdminLabel(false);
        setTimeout(() => navigate("/studentDashboard", { state: { id: enteredUsername } }), 1000)
      }
      else{
        setShowAdminLabel(false);
        getProfessorName(enteredUsername);
        setTimeout(() => navigate("/professor", { state: { id: enteredUsername } }), 1500)
      }
    }

      else{
        notify(true, "Wrong Username or Password");
        setTimeout(() => notify(true, `Are you sure you are ${enteredUsername}?`), 1500)
      }
    })
    .catch((err)=>console.log(err));
  }


  const notify = (isError, message) => {
    if (isError)
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    else
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
  };
  const post = (e) => {
    e.preventDefault();
    if(selectedValue=="dean"){
      if(enteredUsername=="admin" && enteredPassword=="admin123"){
        setShowAdminLabel(true);
        console.log("if")
        toast.success("Success", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => navigate("/admin"), 1500)
      }
      else{
        toast.error("Wrong ID or Password", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    else{
      console.log("else")
    setShowAdminLabel(false);
    getUser(enteredUsername,enteredPassword);}
  }

  window.onpopstate = () => {
    navigate("/login");
  }
  
  const getProfessorName=(id)=>{
    fetch(`http://localhost:8080/faculties/${id}`)
    .then((res)=>res.json())
    .then((res)=>{
      setProfessorName(res.name);
      setProfessorEmail(res.email);
    })
    .catch((err)=>console.log(err));
  }

  const selectFun=(val)=>{
    setSelectedValue(val)
    // if(val=="dean")
    //   setShowAdminLabel(true)
    // else
    // setShowAdminLabel(false)
  }


  return (
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h2>LOGIN</h2>
          <div className="underline-title"></div>
        </div>
        <div className="loginSelect">
          <select name="format" id="format" onChange={(e)=>{selectFun(e.target.value)}}>
            <option value="students">Student</option>
            <option value="faculties">Professor</option>
            <option value="dean">Dean</option>
          </select>
        </div>
        <br></br>
        <form onSubmit={post} class="form">
          <label for="user-email">
            &nbsp;Username
          </label>
          <input id="user-email" className="form-content" type="text" value={enteredUsername} onChange={(e) => setEnteredUsername(e.target.value)} name="username" autocomplete="on" required />
          <div className="form-border"></div>
          <label for="user-password">&nbsp;Password
          </label>
          <input id="user-password" className="form-content" type="password" value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)} name="password" required />
          <div className="form-border"></div>
          <input id="submit-btn" type="submit" name="submit" value="LOGIN" />
        </form>
        <ToastContainer autoClose={1000} />
      </div>
    </div>
  )
}
export default Login;