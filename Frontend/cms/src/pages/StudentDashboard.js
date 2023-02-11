import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import "../styles/StudentDashboard.css";
import profile from '../profile.png'
export const StudentDashboard = ({setShowLogout,setShowLogin,setShowChangepassword}) => {
  setShowLogout(true)
  setShowLogin(false)
  setShowChangepassword(true)


  const location = useLocation();
  const[studentInfo,setStudentInfo]=useState([]);
  const[isFetched,setIsFetched]=useState(false);

  const navigate=useNavigate();
  window.onpopstate = () => {
    navigate("/studentDashboard")
  }

  const getStudent=()=>{
    fetch(`http://localhost:8080/students/${location.state.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      setStudentInfo(res);
      setIsFetched(true);
    })
    .catch((err)=>console.log(err));
  }

  useEffect(()=>{
    getStudent();
  },[]);

  if(!isFetched){
    return <></>
  }
  console.log(studentInfo);
  return (
    <div className="container">
      <div class="one">
      <h1>Student Details</h1>
      </div>

    <div className='main'>
  <div class="card">
  <img src={profile} width="100px" height="100px"></img>
  <h3>{studentInfo.name}</h3>
  <p class="title">{studentInfo.branch}</p>
  <p id="idtag">ID: {studentInfo.id}</p>
</div>

      <div className='details'>
        <table>
          <tr>
            <th>Roll Number</th>
            <td>{studentInfo.rollno}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{studentInfo.email}</td>
          </tr>
          <tr>
            <th>Mobile Number</th>
            <td>{studentInfo.mob}</td>
          </tr>
          <tr>
            <th>Courses</th>
            <td>{studentInfo.courselist}</td>
          </tr>
          <tr>
            <th>HOD</th>
            <td>Dr. Adesh Pandey</td>
          </tr>
        </table>
      </div>

    </div>
    </div>
  )
}

export default StudentDashboard;