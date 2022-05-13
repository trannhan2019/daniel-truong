import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
