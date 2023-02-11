import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Professor from '../pages/Professor'

const divStyle = {
  width: "100%",
  display: "inline-block",
  margin: "0px !important",
  backgroundColor: "#2ec06f"
}

const h1Style = {
  float: "left",
  margin: "10px",
  padding: "0px",
  fontSize: "25px",
  fontWeight: "600",
  color: "white"
}

const h3Style = {
  margin: "12px 15px 0px 0px",
  float: "right",
  align: "right",
  fontWeight: "500",
  color: "white"
}
const h3Style2 = {
  margin: "12px 25px 0px 0px",
  float: "right",
  align: "right",
  fontWeight: "500",
  color: "white"
}
const h6Style = {
  margin:"8px 0px 0px 2px",
  float: "right",
  align: "right",
  fontWeight:"400",
  color:"black"
}

export const Navbar = ({showLogin,setShowLogin,showLogout,showChangePassword,ProfessorName,showProfessorName}) => {
  setShowLogin(true)
  const navigate = useNavigate();
  return (
    <div style={divStyle}>
      <h1 style={h1Style}>College Management System</h1>
      {showLogin && <h3 style={h3Style} onClick={() => {navigate("/login")}}>Login</h3>}
      {showLogout && <h3 style={h3Style} onClick={() => {navigate("/login")}}>Logout</h3>}
      {showChangePassword && <h3 style={h3Style2} onClick={() => {}}>Change Password<h6 style={h6Style}> soon</h6></h3>}
    </div>
  )
}

export default Navbar;