import React from 'react'
import '../styles/AddStudent.css'
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AddStudent = () => {


  const [isFetched, setIsFetched] = useState(false);
  const [coursesList, setCoursesList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [gender, setGender] = useState("");
  const [mob, setMob] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [dob, setDob] = useState("");

  var currentSelection = [];

  const afterSelecting = (val) => {
    if(!(currentSelection.includes(val)))
    setSelectedOptions((currentSelection) => [...currentSelection, val])
  }

  const validate=()=>{
    if(name=="" || gender=="" || roll=="" || mob=="" || email=="" || branch=="" || dob=="" || selectedOptions.length==0){
    toast.error("Enter All details Please", {
      position: toast.POSITION.TOP_CENTER,
    });}
    else{
      let coursesString=selectedOptions.toString();
      let year=dob.slice(0,4)
      let month=dob.slice(5,7)
      let date=dob.slice(8,10)
      let finalDob=date.concat(month)
      let studentID=(name.slice(0,3).toUpperCase).concat(finalDob.concat(year))
      let defaultPassword=name.slice(0,3).concat("12345")
      axios.post('http://localhost:8080/students', {
        id: studentID,
        rollno: roll,
        mob: mob,
        name: name,
        gender: gender,
        branch: branch,
        email: email,
        courselist: coursesString,
        password: defaultPassword
      })
      .then(function (response) {
        console.log(response);
        console.log("success");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  const getCourses = () => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((res) => {
        setCoursesList(res);
        setIsFetched(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCourses();
  }, []);

  if (!isFetched) {
    return <></>
  }

  return (
    <div>
      <h3>STUDENT REGISTRATION FORM</h3>
      <table align="center" cellpadding="10">
        <tr>
          <td><h5>Full Name</h5></td>
          <td><input type="text" name="First_Name" maxlength="30" onChange={(e)=>setName(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td><h5>Roll No.</h5></td>
          <td><input type="text" name="First_Name" maxlength="30" onChange={(e)=>setRoll(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td><h5>Date of Birth</h5></td>

          <td>
            <input type="date" onChange={(e)=>setDob(e.target.value)}/>
          </td>
        </tr>
        <tr>
          <td><h5>Gender</h5></td>
          <td id="gender">
            <h5>Male</h5> <input type="radio" name="Gender" value="Male" onChange={(e)=>setGender(e.target.value)}/>
            <h5>Female</h5> <input type="radio" name="Gender" value="Female" onChange={(e)=>setGender(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td><h5>Mobile Number</h5></td>
          <td><input type="text" name="First_Name" maxlength="30" onChange={(e)=>setMob(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td><h5>Email</h5></td>
          <td><input type="email" name="First_Name" maxlength="30" onChange={(e)=>setEmail(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td><h5>Branch</h5></td>

          <td>
            <select name="branch" id="selectBranch" onChange={(e)=>setBranch(e.target.value)}>
              <option value="">Select Branch</option>
              <option value="IT">IT</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EN">EN</option>

              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><h5>Courses</h5></td>
          <td>
            <select name="courses" id="selectCourses" onChange={(e) => { afterSelecting(e.target.value) }}>
              <option value="">Select Courses</option>
              {
                coursesList.map(course => (
                  <option value={course.name}>{course.name}</option>
                ))
              }
            </select>
            <div className='selectedCourses'>
              {
                selectedOptions.map(course => (
                  <li className='eachCourse'>{course}</li>
                ))
              }
            </div>
          </td>
        </tr>
      </table>
      <button className='addButton' onClick={validate}>Register Student</button>
      <ToastContainer autoClose={1000} />
      </div>
  )
}

export default AddStudent;