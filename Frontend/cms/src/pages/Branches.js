import React from 'react'
import '../styles/Branches.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Branches = ({ professorName, professorEmail, setShowLogin,showAdminLabel}) => {

  setShowLogin(false);

  const navigate = useNavigate();

  console.log(showAdminLabel)

  const [branchesList, setBranchesList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getBranches = () => {
    fetch("http://localhost:8080/branches")
      .then((res) => res.json())
      .then((res) => {
        setBranchesList(res);
        setIsFetched(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getBranches();
    if (professorName.length==0)
    if(!showAdminLabel)
    navigate("/login");
  }, []);

  if (!isFetched) {
    return <></>
  }


  
  return (
    <div>
      <ul>
        <li onClick={() => { navigate("/professor") }}>Dashboard</li>
        <li onClick={() => { navigate("/addStudent") }}>Register Student</li>
        {showAdminLabel && <li onClick={() => { navigate("/addProfessor") }}>Register Professor</li>}
        <li onClick={() => { navigate("/courses") }}>Course Information</li>
        <li className="active">Branch Information</li>
        {showAdminLabel && <li onClick={() => {navigate("/addBranch") }}>Manage Branches</li>}
        {showAdminLabel && <li onClick={() => {navigate("/addCourse") }}>Manage Courses</li>}
      </ul>

      <div className='branchRightMain'>
        {!(showAdminLabel) && <h5 id="profName">Hi, {professorName}</h5>}
        { !(showAdminLabel) &&  <h5 id="profEmail">{professorEmail}</h5>}
        <div className='branchRow'>
          {
            branchesList.map(branch => (
              <div className='branchColumn'>
                <div className='branchCard'>
                  <h3 id="branchh3">{branch.code}</h3>
                  <p id="branchP">HOD: {branch.hod}</p>
                  <p id="branchP">Courses: {branch.courses}</p>
                  <p id="branchP">Professors: {branch.professors}</p>
                </div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default Branches;