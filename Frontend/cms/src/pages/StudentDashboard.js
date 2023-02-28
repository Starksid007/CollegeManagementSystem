import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/StudentDashboard.css";
import profile from '../profile.png'
import phone from '../phone.png'
import mail from '../mail.png'
import male from '../male.png'
import female from '../female.png'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const StudentDashboard = ({ setShowLogout, setShowLogin, setShowChangepassword }) => {

  setShowLogout(true)
  setShowLogin(false)
  setShowChangepassword(true)



  const location = useLocation();
  const [studentInfo, setStudentInfo] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isEditDivOpen, setIsEditDivOpen] = useState(false);
  const [mobText, setMobText] = useState("");
  const [mailText, setMailText] = useState("");

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

  const updateFun=()=>{
    setMobText(studentInfo.mob)
    setMailText(studentInfo.email)
    setIsEditDivOpen(!isEditDivOpen)
  }

  const postFun=()=>{
    if(mobText!="" && mailText!=""){
    axios.put(`http://localhost:8080/students/${studentInfo.id}`, {
        id: studentInfo.id,
        rollno: studentInfo.rollno,
        mob: mobText,
        name: studentInfo.name,
        gender: studentInfo.gender,
        branch: studentInfo.branch,
        email: mailText ,
        courselist: studentInfo.courselist,
        password: studentInfo.password
      })
        .then(function (response) {
          toast.success("Successfully Updated", {
            position: toast.POSITION.TOP_CENTER,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        toast.error("Can't be empty", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    setIsEditDivOpen(!isEditDivOpen)
  }

  useEffect(() => {
    getStudent();
  }, []);

  if (!isFetched) {
    return <></>
  }

  let courseslis = studentInfo.courselist
  courseslis = courseslis.split(',')

  let stuID = studentInfo.id
  stuID = stuID.slice(3, 11)
  let dd = stuID.slice(0, 2)
  let mm = stuID.slice(2, 4)
  let yyyy = stuID.slice(4, 8)
  let finalDOB = `${dd}/${mm}/${yyyy}`
  return (
    <div>

      <h1 id="dashboardHeading">Student Details</h1>

      <div className="mainStuContainer">

        <div className="stuContainer">

          <div className='stuFirst'>
            <img src={profile} width="50px" height="50px" />
            <div className='nameAndID'>
              <h2 id="nameLabel">{studentInfo.name}</h2>
              <h4 id="idLabel">{studentInfo.id}</h4>
            </div>
            {studentInfo.gender == "Male" && <img id="genderImg" src={male} width="20px" height="20px" />}
            {studentInfo.gender == "Female" && <img id="genderImg" src={female} width="20px" height="20px" />}


            {!isEditDivOpen && <div className='phoneAndMail'>
              <div id="mobDiv">
                <img src={phone} width="15px" height="15px" id="mobileImg" /><h5>{studentInfo.mob}</h5></div>
              <div id="mailDiv">
                <img src={mail} width="19px" height="19px" id="mailImg" /><h5>{studentInfo.email}</h5></div>
            </div>}

            {isEditDivOpen && <div className="editphoneAndMail">
              <div id="editmobDiv">
                <img src={phone} width="15px" height="15px" id="mobileImg" /><input type="text" placeholder={studentInfo.mob} onChange={(e) => setMobText(e.target.value)} /></div>
              <div id="editmailDiv">
                <img src={mail} width="19px" height="19px" id="mailImg" /><input id="mailEditInput" type="text" placeholder={studentInfo.email} onChange={(e) => setMailText(e.target.value)}/></div>
            </div>

            }

            {!isEditDivOpen && <button className='updateBtn' onClick={updateFun}>Update Details</button>}
            {isEditDivOpen && <button className='updateBtn' onClick={postFun}>Submit</button>}
          </div>
          <hr />
          <br />

          <div className='belowStuContainer'  >

            <div className='stuSecond'>
              <h3 id="courseStuLabel">Courses</h3>
              <div className='allCoursesDiv'>
                {courseslis.map(cour => (
                  <li class="stuCourses">{cour}</li>
                ))}
              </div>
            </div>

            <div id="stuVerLine">
            </div>

            <div className='StuCardsContainer'>
              <div className='infoCardStu'>
                <h5 id="cardHeadStu">Branch</h5>
                <h3 id="cardContentStu">{studentInfo.branch}</h3>
              </div>
              <div className='infoCardStu'>
                <h5 id="cardHeadStu">CGPA</h5>
                <h3 id="cardContentStu">9.2</h3>
              </div>
            </div>

            <div className='belowRightStuContainer'>
              <div className='belowRightStuContainerFirst'>
                <h3 id="acadLabel">Academic Information</h3>
                <h5 id="leftHeading">Roll no : &nbsp;  </h5><h5>{studentInfo.rollno}</h5>
                <br></br>
                <h5 id="leftHeading">Mentor : &nbsp; </h5><h5>Pramod Nath</h5>
              </div>

              <div className='attendaceMainContainer'>
                <div className="circle-wrap">
                  <div className="circle">
                    <div className="mask full">
                      <div className="fill"></div>
                    </div>
                    <div className="mask half">
                      <div className="fill"></div>
                    </div>
                    <div className="inside-circle"> 75% </div>
                  </div>
                </div>
                <h5 id="attendanceLabel">Attendance</h5>
              </div>

            </div>





          </div>

        </div>
        {/* <div class="one">
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
      </div> */}
      </div>
      <ToastContainer autoClose={500}/>
    </div>

  )
}

export default StudentDashboard;