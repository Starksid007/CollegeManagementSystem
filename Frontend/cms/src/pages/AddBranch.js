import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AddBranch.css'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import bin from '../bin.png';

export const AddBranch = ({ setShowLogin, showAdminLabel }) => {

  const navigate = useNavigate();

  setShowLogin(false);


  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedProfOptions, setSelectedProfOptions] = useState([]);
  const [code, setCode] = useState("");
  const [HOD, setHOD] = useState("");
  const [professorsList, setProfessorsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);


  const getCourses = () => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((res) => {
        setCoursesList(res);
      })
      .catch((err) => console.log(err));
  }


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

  useEffect(() => {
    getCourses();
    getProfessors();
    getBranches();
    if (!showAdminLabel) {
      navigate("/login")
    }
  })


  const validate = () => {
    if (code == "" || HOD == "" || selectedOptions.length == 0 || selectedProfOptions.length == 0) {
      toast.error("Enter All details Please", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else {

      axios.post('http://localhost:8080/branches', {
        code: code,
        hod: HOD,
        professors: selectedProfOptions.toString(),
        courses: selectedOptions.toString()
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

  const deleteBranch = (id) => {
    axios.delete(`http://localhost:8080/branches/${id}`)
    getBranches();
  }



  var currentSelection = [];
  const afterSelecting = (val) => {
    if (!(currentSelection.includes(val)))
      setSelectedOptions((currentSelection) => [...currentSelection, val])
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
        <li className="active">Manage Branches</li>
        <li onClick={() => { navigate("/addCourse") }}>Manage Courses</li>
      </ul>
      <div id="courseRightDiv">
      <div id="addCourseDiv">
        <h3 id="heading">ADD BRANCH</h3>
        <table align="center" cellpadding="10" id="addCourseTable">
          <tr>
            <td><h5>Branch Code</h5></td>
            <td><input type="text" name="Branch_Code" maxlength="10" onChange={(e) => setCode(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td><h5>HOD</h5></td>

            <td>
              <select name="branch" id="selectBranch" onChange={(e) => setHOD(e.target.value)}>
                <option value="">Select HOD</option>
                {
                  professorsList.map(hod => (
                    <option value={hod.name}>{hod.name}</option>
                  ))
                }
              </select>
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
        <button  className='courseAddButton' onClick={validate}>Add Branch</button>
      </div>
      <div id="courseListContainer">
            {
              branchesList.map(branch => (
                <div className="listcard">
                  <h5 id="h5id">{branch.code}</h5>
                  <h5 id="h5name">{branch.hod}</h5>
                  <img src={bin} className="deleteIcon" width="23px" height="23px" onClick={() => deleteBranch(branch.id)} />
                </div>
              ))
            }

          </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default AddBranch;