import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <div>
    <Router>
    <Navbar/>
      <Routes>
      {/* <Route path="/" element={<h1>Hello world</h1>}/> */}
      <Route path="/login" element={<Login/>}/>
      <Route path="/studentDashboard" element={<StudentDashboard/>}/>
    </Routes>
  </Router>
  </div>
  );
}

export default App;
