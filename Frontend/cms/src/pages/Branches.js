import React from 'react'
import '../styles/Branches.css';
import { useState,useEffect } from 'react';

export const Branch = () => {

  const[branchesList,setBranchesList]=useState([]);
  const[isFetched,setIsFetched]=useState(false);

  const getBranches=()=>{
    fetch("http://localhost:8080/branches")
    .then((res)=>res.json())
    .then((res)=>{
      setBranchesList(res);
      setIsFetched(true);
    })
    .catch((err)=>console.log(err));
  }

  useEffect(()=>{
    getBranches();
  },[]);

  if(!isFetched){
    return <></>
  }

  return (
    <div>
      <ul>
        <li>Dashboard</li>
        <li>Register Student</li>
        <li>Course Information</li>
        <li className='active'>Branch Information</li>
      </ul>

      <div className='branchRightMain'>
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

export default Branch;