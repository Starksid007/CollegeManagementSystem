import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/StudentDashboard.css";
import profile from '../profile.png'
export const StudentDashboard = ({ setShowLogout, setShowLogin, setShowChangepassword }) => {

  setShowLogout(true)
  setShowLogin(false)
  setShowChangepassword(true)

  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const navigate = useNavigate();
  window.onpopstate = () => {
    navigate("/studentDashboard")
  }

  const getStudent = () => {
    fetch(`http://localhost:8080/students/${location.state.id}`)
      .then((res) => res.json())
      .then((res) => {
        setStudentInfo(res);
        setIsFetched(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getStudent();
  }, []);

  if (!isFetched) {
    return <></>
  }

  let stuID=studentInfo.id
  stuID=stuID.slice(3,11)
  let dd=stuID.slice(0,2)
  let mm=stuID.slice(2,4)
  let yyyy=stuID.slice(4,8)
  let finalDOB=`${dd}/${mm}/${yyyy}`
  return (
    <div className="container">
      {/* <div className="stuContainer">
        <div className='stuFirst'>
          <img src={profile} width="50px" height="50px"/>
          <div className='nameAndID'>
          <h2>{studentInfo.name}</h2>
          <h4>{studentInfo.id}</h4>
          </div>
          <button className='updateBtn'>Update Details</button>
        </div>
      </div> */}
      <div class="one">
        <h1>Student Details</h1>
      </div>

      <div className='main'>
        <div class="card">
          <img src={profile} width="100px" height="100px"></img>
          <h2 id="nameHeading">{studentInfo.name}</h2>
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
              <th>DOB</th>
              <td>{finalDOB}</td>
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