import React from 'react'
import '../styles/Courses.css';
import { useState,useEffect } from 'react';
export const Courses = () => {

    const[coursesList,setCoursesList]=useState([]);
    const[isFetched,setIsFetched]=useState(false);

    const getCourses=()=>{
        fetch("http://localhost:8080/courses")
        .then((res)=>res.json())
        .then((res)=>{
          setCoursesList(res);
          setIsFetched(true);
        })
        .catch((err)=>console.log(err));
      }

      useEffect(()=>{
        getCourses();
      },[]);
    
      if(!isFetched){
        return <></>
      }

    return (
        <div>
            <ul>
                <li>Dashboard</li>
                <li>Register Student</li>
                <li className='active'>Course Information</li>
                <li>Branch Information</li>
            </ul>
            <div className='mainRight'>
                <div className='courseRow'>
                    {
                        coursesList.map(course=>(
                            <div className='courseColumn'>
                                <div className='courseCard'>
                                    <h3 id="courseh3">{course.name}</h3>
                                    <p id="courseP">Professors: {course.professor}</p>
                                    <p id="courseP">Credits: {course.credits}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    )
}

export default Courses;