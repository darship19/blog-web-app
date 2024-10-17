// src/App.js
import "./App.css";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from "./pages/CreatePost";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Nav from './Nav'; 
import '@fortawesome/fontawesome-free/css/all.min.css'


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Nav isAuth={isAuth} setIsAuth={setIsAuth} /> {/* Use Nav component */}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
