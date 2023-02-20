import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import '../styles/AddCourse.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import bin from '../bin.png'


export const AddCourse = ({ setShowLogin, showAdminLabel }) => {

  const navigate = useNavigate();

  setShowLogin(false);

  const [selectedProfOptions, setSelectedProfOptions] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [professorsList, setProfessorsList] = useState([]);
  const [credits, setCredits] = useState("");
  const [courseName, setCourseName] = useState("");
  const [branch, setBranch] = useState("");
  const [coursesList, setCoursesList] = useState([]);



  const getProfessors = () => {
    fetch("http://localhost:8080/faculties")
      .then((res) => res.json())
      .then((res) => {
        setProfessorsList(res);
      })
      .catch((err) => console.log(err));
  }

  const getBranches = () => {
    fetch("http://localhost:8080/branches")
      .then((res) => res.json())
      .then((res) => {
        setBranchesList(res);
      })
      .catch((err) => console.log(err));
  }

  const getCourses = () => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((res) => {
        setCoursesList(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBranches();
    getCourses();
    getProfessors();
    if (!showAdminLabel) {
      navigate("/login")
    }
  })

  const validate = () => {
    if (courseName == "" || credits == "" || branch == "" || selectedProfOptions.length == 0) {
      toast.error("Enter All details Please", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else {
      let courseID = coursesList.length + 1
      console.log(selectedProfOptions)
      axios.post('http://localhost:8080/courses', {
        id: courseID,
        name: courseName,
        branch: branch,
        credits: credits,
        professor: selectedProfOptions.toString()
      })
        .then(function (response) {
          toast.success("Successfully Added", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/admin");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const deleteCourse = (id) => {
    axios.delete(`http://localhost:8080/courses/${id}`)
    getCourses();
  }

  var currentProfSelection = [];
  const afterProfSelecting = (val) => {
    if (!(currentProfSelection.includes(val)))
      setSelectedProfOptions((currentProfSelection) => [...currentProfSelection, val])
  }

  return (
    <div>
      <ul>
        <li onClick={() => { navigate("/admin") }} >Dashboard</li>
        <li onClick={() => { navigate("/addStudent") }}>Register Student</li>
        <li onClick={() => { navigate("/addProfessor") }}>Register Professor</li>
        <li onClick={() => { navigate("/courses") }}>Course Information</li>
        <li onClick={() => { navigate("/branches") }}>Branch Information</li>
        <li onClick={() => { navigate("/addBranch") }} >Manage Branches</li>
        <li className="active">Manage Courses</li>
      </ul>
        <div id="courseRightDiv">
          <div id="addCourseDiv">
            <h3 id="heading">ADD COURSE</h3>
            <table align="center" cellpadding="10" id="addCourseTable">
              <tr>
                <td><h5>Course Name</h5></td>
                <td><input type="text" name="Branch_Code" maxlength="10" onChange={(e) => setCourseName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td><h5>Branch</h5></td>

                <td>
                  <select name="branch" id="selectBranch" onChange={(e) => setBranch(e.target.value)}>
                    <option value="">Select Branch</option>
                    {
                      branchesList.map(branch => (
                        <option value={branch.code}>{branch.code}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
              <tr>
                <td><h5>Credits</h5></td>
                <td><input type="number" name="Branch_Code" maxlength="10" onChange={(e) => setCredits(e.target.value)} />
                </td>
              </tr>

              <tr>
                <td><h5>Professors</h5></td>
                <td>
                  <select name="courses" id="selectCourses" onChange={(e) => { afterProfSelecting(e.target.value) }}>
                    <option value="">Select Professors</option>
                    {
                      professorsList.map(prof => (
                        <option value={prof.name}>{prof.name}</option>
                      ))
                    }
                  </select>
                  <div className='selectedCourses'>
                    {
                      selectedProfOptions.map(prof => (
                        <li className='eachCourse'>{prof}</li>
                      ))
                    }
                  </div>
                </td>
              </tr>
            </table>
            <button className='courseAddButton' onClick={validate}>Add Course</button>
          </div>
          <div id="courseListContainer">
            {
              coursesList.map(course => (
                <div className="listcard">
                  <h5 id="h5id">{course.id}</h5>
                  <h5 id="h5name">{course.name}</h5>
                  <h5 id="h5branch">{course.branch}</h5>
                  <img src={bin} className="deleteIcon" width="23px" height="23px" onClick={() => deleteCourse(course.id)} />
                </div>
              ))
            }

          </div>
        </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default AddCourse;