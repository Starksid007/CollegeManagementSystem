import React from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
const divStyle={
    width:"100%",
    display:"inline-block",
    margin:"0px 0px 0px 0px",
    backgroundColor:"#2dbd6e"
}

const h1Style={
    float:"left",
    margin:"10px",
    padding:"0px",
    fontSize: "25px",
    fontWeight: "600",
    color:"white"
}

const h3Style={
    margin:"12px 10px 0px 0px",
    float:"right",
    align:"right",
    fontWeight:"500",
    color:"white"
}

export const Navbar = () => {
  const navigate=useNavigate();
  return (
    <div style={divStyle}>
        <h1 style={h1Style}>College Management System</h1>
       <h3 style={h3Style} onClick={()=>navigate("/login")}>Login</h3>
    </div>
  )
}

export default Navbar;