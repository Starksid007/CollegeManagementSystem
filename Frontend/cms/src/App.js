import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import { useState } from 'react';
import { Professor } from './pages/Professor';
import AddStudent from './pages/AddStudent';
import Courses from './pages/Courses';
import Branches from './pages/Branches';

function App() {
  const[showLogin,setShowLogin]=useState(false);
  const[showLogout,setShowLogout]=useState(false);
  const[showChangePassword,setShowChangepassword]=useState(false);
  const[professorName,setProfessorName]=useState("");
  const[professorEmail,setProfessorEmail]=useState("");

  return (
    <div>
      <Router>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} showLogout={showLogout} showChangePassword={showChangePassword} professorName={professorName} />
        <Routes>
          {/* <Route path="/" element={<h1>Hello world</h1>}/> */}
          <Route path="/login" element={<Login setShowLogin={setShowLogin}  setShowLogout={setShowLogout} setShowChangepassword={setShowChangepassword} setProfessorName={setProfessorName} professorName={professorName} setProfessorEmail={setProfessorEmail} professorEmail={professorEmail}/>} />
          <Route path="/studentDashboard" element={<StudentDashboard showLogout={showLogout} setShowLogout={setShowLogout}  setShowLogin={setShowLogin} setShowChangepassword={setShowChangepassword} />} />
          <Route path="/professor" element={<Professor showLogout={showLogout} setShowLogout={setShowLogout}  setShowLogin={setShowLogin} setShowChangepassword={setShowChangepassword} setProfessorName={setProfessorName} professorName={professorName} setProfessorEmail={setProfessorEmail} professorEmail={professorEmail}/>}/>
          <Route path="/addStudent" element={<AddStudent/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/branches" element={<Branches/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
