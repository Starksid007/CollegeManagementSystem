import React, { useState,useEffect } from 'react'
import "../styles/Professor.css";
import axios from 'axios';
import bin from '../bin.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Professor = ({setShowLogout,setShowLogin,setShowChangepassword,setProfessorName,professorName,setProfessorEmail,professorEmail}) => {



  const navigate=useNavigate();

  setShowLogout(true)
  setShowLogin(false)
  setShowChangepassword(true)

  let tempProfessorName=professorName;
  setProfessorName(tempProfessorName);
  console.log(professorName)

    const[studentList,setStudentList]=useState([]);
    const[coursesList,setCoursesList]=useState([]);
    const[branchesList,setBranchesList]=useState([]);
    const[isFetched,setIsFetched]=useState(false);
    const[searchText,setSearchText]=useState("");

    const getCourses=()=>{
        fetch("http://localhost:8080/courses")
        .then((res)=>res.json())
        .then((res)=>{
          setCoursesList(res);
        })
        .catch((err)=>console.log(err));
      }

      const getBranches=()=>{
        fetch("http://localhost:8080/branches")
        .then((res)=>res.json())
        .then((res)=>{
          setBranchesList(res);
        })
        .catch((err)=>console.log(err));
      }

    const getStudents=(filterBranch)=>{

      if(filterBranch.length==11){
        fetch(`http://localhost:8080/students/${filterBranch}`)
        .then((res)=>res.json())
        .then((res)=>{
          console.log(res)
          setStudentList([res]);
          setIsFetched(true);
      })
      .catch((err)=>console.log(err));
    }

      else{

      let tempList=[]
        fetch("http://localhost:8080/students")
        .then((res)=>res.json())
        .then((res)=>{

          if(filterBranch!=""){
          res.map((student)=>{
            if(student.branch==filterBranch)
            tempList.push(student)
            
          })
          setStudentList(tempList);
          setIsFetched(true);
        }

          else{
          setStudentList(res);
          setIsFetched(true);}

        })
        .catch((err)=>console.log(err));
      }
    }

      useEffect(()=>{
        if(professorName.length==0){
          navigate("/login")
        }
        getStudents("");
        getCourses();
        getBranches();
      },[]);
    
      if(!isFetched){
        return <></>
      }

      const deleteStudent=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8080/students/${id}`)
        getStudents("");
      }


      
      const searchFun=()=>{
       
        if(searchText.length!=0 && searchText.length==11)
        getStudents(searchText);
        else{
          console.log(searchText)
        toast.error("Enter Correct ID", {
          position: toast.POSITION.TOP_CENTER,
        });}
      }

      const clearFun=()=>{
        setSearchText("");
        getStudents("");

      }
      window.onpopstate = () => {
        navigate("/professor");
      }


    return (
        <div>
            <ul>
                <li className="active">Dashboard</li>
                <li>Register Student</li>
                <li>Course Information</li>
                <li>Branch Information</li>
            </ul>
            <div className="rightContainer" id="rightContainer">
            <h5 id="profName">Hi, {professorName}</h5>
            <h5 id="profName">{professorEmail}</h5>
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
                    
                </div>
                <div className='filterSearch'>
                  <input type="text" placeholder='Serach by ID' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
                  <button className='searchBtn' onClick={searchFun}>Search</button>
                  <button className='clearBtn' onClick={clearFun}>Clear</button>
                  <select className='selectBranchProf' name="branch" onChange={(e)=>{getStudents(e.target.value)}}>
                    <option value="">Filter by Branch</option>
                    {
                      branchesList.map(branch=>(
                        <option value={branch.code}>{branch.code}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="listcontainer">
                    {studentList.map(student=>(
                        <div className="listcard">
                            <h5 id="h5id">{student.id}</h5>
                            <h5 id="h5name">{student.name}</h5>
                            <h5 id="h5branch">{student.branch}</h5>
                            <h5 id="h5email">{student.email}</h5>
                            <h5 id="h5mob">{student.mob}</h5>
                            <img src={bin} className="deleteIcon" width="23px" height="23px" onClick={()=>deleteStudent(student.id)}/>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    )
                    }

export default Professor;