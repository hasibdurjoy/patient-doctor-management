import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PatientHomePage from './Pages/Patient/PatientHomePage/PatientHomePage';
import Navigation from './Pages/Shared/Navigation/Navigation';
import Login from './Pages/Authentication/LogIn/LogIn';
import Register from './Pages/Authentication/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Profile from './Pages/Shared/Profile/Profile';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/patient" element={<PatientHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
