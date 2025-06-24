// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import FooterPlayer from "./components/FooterPlayer";


import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="main-layout">
          <Sidebar />
          <MainContent />
          <RightSidebar />
        </div>

        <FooterPlayer />
      </div>
    </Router>
  );
}

export default App;
