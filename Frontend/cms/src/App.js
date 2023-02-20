import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import { useState } from 'react';
import { Professor } from './pages/Professor';
import { AddStudent } from './pages/AddStudent';
import { Courses } from './pages/Courses';
import { Branches } from './pages/Branches';
import { Admin } from './pages/Admin';
import { AddProfessor } from './pages/AddProfessor';
import AddBranch from './pages/AddBranch';
import AddCourse from './pages/AddCourse';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showChangePassword, setShowChangepassword] = useState(false);
  const [professorName, setProfessorName] = useState("");
  const [professorEmail, setProfessorEmail] = useState("");
  const [showAdminLabel, setShowAdminLabel] = useState(false);
  

  return (
    <div>
      <Router>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} showLogout={showLogout} showChangePassword={showChangePassword} showAdminLabel={showAdminLabel} />
        <Routes>
          {/* <Route path="/" element={<h1>Hello world</h1>}/> */}
          <Route path="/login" element={<Login setShowLogin={setShowLogin} setShowLogout={setShowLogout} setShowChangepassword={setShowChangepassword} setProfessorName={setProfessorName} setProfessorEmail={setProfessorEmail} showAdminLabel={showAdminLabel} setShowAdminLabel={setShowAdminLabel}/>} />
          <Route path="/studentDashboard" element={<StudentDashboard showLogout={showLogout} setShowLogout={setShowLogout} setShowLogin={setShowLogin} setShowChangepassword={setShowChangepassword} />} />
          <Route path="/professor" element={<Professor setShowLogout={setShowLogout} setShowLogin={setShowLogin} setShowChangepassword={setShowChangepassword} professorName={professorName} professorEmail={professorEmail} setShowAdminLabel={setShowAdminLabel}/>} />
          <Route path="/addStudent" element={<AddStudent professorName={professorName} professorEmail={professorEmail} setShowLogin={setShowLogin} showAdminLabel={showAdminLabel} />} />
          <Route path="/courses" element={<Courses professorName={professorName} professorEmail={professorEmail} setShowLogin={setShowLogin} showAdminLabel={showAdminLabel} />} />
          <Route path="/branches" element={<Branches professorName={professorName} professorEmail={professorEmail} setShowLogin={setShowLogin} showAdminLabel={showAdminLabel} />} />
          <Route path="/admin" element={<Admin setShowLogout={setShowLogout} setShowLogin={setShowLogin} setShowAdminLabel={setShowAdminLabel} showAdminLabel={showAdminLabel}/>} />
          <Route path="/addProfessor" element={<AddProfessor setShowLogin={setShowLogin} showAdminLabel={showAdminLabel}/>} />
          <Route path="/addBranch" element={<AddBranch setShowLogin={setShowLogin} showAdminLabel={showAdminLabel}/>} />
          <Route path="/addCourse" element={<AddCourse setShowLogin={setShowLogin} showAdminLabel={showAdminLabel}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
