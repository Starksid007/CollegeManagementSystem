import React, { useEffect, useState } from 'react'
import "../styles/StudentDashboard.css";
import Marquee from "react-fast-marquee";

export const StudentDashboard = () => {

  return (
    <div>
      <div>
        <Marquee speed={100}><h2>Student Details</h2></Marquee>
      </div>
    </div>
  )
}

export default StudentDashboard;