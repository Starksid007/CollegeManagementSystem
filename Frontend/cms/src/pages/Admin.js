import React from 'react'
import axios from 'axios';
import bin from '../bin.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import '../styles/Admin.css';
import Professor from './Professor';

export const Admin = ({setShowLogout,setShowLogin,setShowAdminLabel,showAdminLabel}) => {
  const navigate = useNavigate();

  setShowLogout(true)
  setShowLogin(false)


  const [studentList, setStudentList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [branchesList, setBranchesList] = useState([]);
  const [professorsList, setProfessorsList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [profSearchText, setProfSearchText] = useState("");

  const getCourses = () => {
    fetch("http://localhost:8080/courses")
      .then((res) => res.json())
      .then((res) => {
        setCoursesList(res);
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

  const getProfessors = (filterProfessor) => {
    if(filterProfessor==""){
    fetch("http://localhost:8080/faculties")
      .then((res) => res.json())
      .then((res) => {
        setProfessorsList(res);
      })
      .catch((err) => console.log(err));
  }
  else{
    fetch(`http://localhost:8080/faculties/${filterProfessor}`)
      .then((res) => res.json())
      .then((res) => {
        setProfessorsList([res]);
      })
      .catch((err) => console.log(err));

  }
}


  const getStudents = (filterBranch) => {

    if (filterBranch.length == 11) {
      fetch(`http://localhost:8080/students/${filterBranch}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setStudentList([res]);
          setIsFetched(true);
        })
        .catch((err) => console.log(err));
    }

    else {

      let tempList = []
      fetch("http://localhost:8080/students")
        .then((res) => res.json())
        .then((res) => {

          if (filterBranch != "") {
            res.map((student) => {
              if (student.branch == filterBranch)
                tempList.push(student)

            })
            setStudentList(tempList);
            setIsFetched(true);
          }

          else {
            setStudentList(res);
            setIsFetched(true);
          }

        })
        .catch((err) => console.log(err));
    }
  }

  window.onbeforeunload = () => {
    return "Are you sure?"
  }

  useEffect(() => {
    console.log(showAdminLabel)
    if(!showAdminLabel){
      navigate("/login")
    }
    else{
      getStudents("");
      getCourses();
      getBranches();
      getProfessors("");
    }

  }, []);

  if (!isFetched) {
    return <></>
  }

  const deleteStudent = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8080/students/${id}`)
    getStudents("");
  }

  const deleteProfessor = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8080/faculties/${id}`)
    getProfessors("");
  }


  const searchFun = () => {

    if (searchText.length != 0 && searchText.length == 11)
      getStudents(searchText);
    else {
      toast.error("Enter Correct ID", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  const searchProfFun = () => {

    if (profSearchText.length != 0)
      getProfessors(profSearchText);
    else {
      toast.error("Enter Correct ID", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }


  const clearFun = () => {
    setSearchText("");
    getStudents("");

  }

  const clearProfFun = () => {
    setProfSearchText("");
    getProfessors("");
  }


  window.onpopstate = () => {
    navigate("/admin");
  }

  return (
    <div>
      <ul>
        <li className="active">Dashboard</li>
        <li onClick={() => { navigate("/addStudent") }}>Register Student</li>
        <li onClick={() => { navigate("/addProfessor") }}>Register Professor</li>
        <li onClick={() => { navigate("/courses", {state:{showAdminLabel:true}})}}>Course Information</li>
        <li onClick={() => { navigate("/branches") }}>Branch Information</li>
        <li onClick={() => { navigate("/addBranch") }}>Manage Branches</li>
        <li onClick={() => { navigate("/addCourse") }}>Manage Courses</li>
      </ul>
      <div className="rightContainer" id="rightContainer">
        <div className='profRow'>
          <div className='profCard'>
            <h3 className='cardh3'>{studentList.length}</h3>
            <p>Students</p>
          </div>
          <div className='profCard'>
            <h3 className='cardh3'>{coursesList.length}</h3>
            <p>Courses</p>
          </div>
          <div className='profCard'>
            <h3 className='cardh3'>{branchesList.length}</h3>
            <p>Branches</p>
          </div>
          <div className='profCard'>
            <h3 className='cardh3'>{professorsList.length}</h3>
            <p>Professors</p>
          </div>

        </div>

        <div className='filterDiv'>
        <div className='filterSearch'>
          <input type="text" placeholder='Serach Student ID' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button className='searchBtn' onClick={searchFun}>Search</button>
          <button className='clearBtn' onClick={clearFun}>Clear</button>
          <select className='selectBranchProf' name="branch" onChange={(e) => { getStudents(e.target.value) }}>
            <option value="">Filter by Branch</option>
            {
              branchesList.map(branch => (
                <option value={branch.code}>{branch.code}</option>
              ))
            }
          </select>
        </div>
        <div className='professorFilter'>
          <input type="text" placeholder='Serach Professor ID' value={profSearchText} onChange={(e) => setProfSearchText(e.target.value)} />
          <button className='searchBtn' onClick={searchProfFun}>Search</button>
          <button className='clearBtn' onClick={clearProfFun} >Clear</button>
        </div>
        </div>

        <div className='allListContainer'>
        <div className="studentListContainer">
          {studentList.map(student => (
            <div className="listcardAdmin">
              <h5 id="h5id">{student.id}</h5>
              <h5 id="h5name">{student.name}</h5>
              <h5 id="h5branch">{student.branch}</h5>
              <img src={bin} className="deleteIconAdmin" width="23px" height="23px" onClick={() => deleteStudent(student.id)} />
            </div>
          ))}
        </div>

            <div className='middleBorder'>

            </div>

        <div className="professorListContainer">
          {professorsList.map(professor => (
            <div className="listcardAdmin">
              <h5 id="h5id">{professor.id}</h5>
              <h5 id="h5name">{professor.name}</h5>
              <h5 id="h5branch">{professor.branch}</h5>
              <img src={bin} className="deleteIconAdmin" width="23px" height="23px" onClick={() => deleteProfessor(professor.id)}/>
            </div>
          ))}
        </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  )
}

export default Admin;
