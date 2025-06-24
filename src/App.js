// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import FooterPlayer from "./components/FooterPlayer";
import Browse from "./components/Browse";


import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="main-layout">
          <Sidebar />
          <Routes>
            <Route path="/" element={
              <>
                <MainContent />
                <RightSidebar />
              </>
            } />
            <Route path="/browse" element={<Browse />} />
          </Routes>
          
        </div>
        <FooterPlayer />
      </div>
    </Router>
  );
}

export default App;
