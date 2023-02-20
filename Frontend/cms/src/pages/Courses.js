import React from 'react'
import '../styles/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Courses = ({ professorName, professorEmail, setShowLogin,showAdminLabel}) => {

    setShowLogin(false);
    const navigate = useNavigate();

    console.log(showAdminLabel)

    const [coursesList, setCoursesList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const getCourses = () => {
        fetch("http://localhost:8080/courses")
            .then((res) => res.json())
            .then((res) => {
                setCoursesList(res);
                setIsFetched(true);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCourses();
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
                {showAdminLabel && <li onClick={() => { navigate("/addProfessor") }}>Register Student</li>}
                <li className="active">Course Information</li>
                <li onClick={() => { navigate("/branches") }}>Branch Information</li>
                {showAdminLabel && <li onClick={() => { navigate("/addBranch") }}>Manage Branches</li>}
                {showAdminLabel && <li onClick={() => { navigate("/addCourse") }}>Manage Courses</li>}
            </ul>
            <div className='mainRight'>
                {!(showAdminLabel) &&  <h5 id="profName">Hi, {professorName}</h5>}
                {!(showAdminLabel) && <h5 id="profEmail">{professorEmail}</h5>}
                <div className='courseRow'>
                    {
                        coursesList.map(course => (
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