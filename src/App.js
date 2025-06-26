// src/App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import FooterPlayer from "./components/FooterPlayer";
import Browse from "./components/Browse";
import { PlayerProvider, PlayerContext } from './context/PlayerContext';
import MorePage from "./components/MorePage";

import "./styles/App.css";

function AppContent() {
  const { playlist, currentIndex } = useContext(PlayerContext);
  const showFooter = playlist && playlist.length > 0 && currentIndex >= 0 && currentIndex < playlist.length;
  return (
    <div className="app">
      <div className="main-layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/more" element={<MorePage />} />
        </Routes>
      </div>
      {showFooter && <FooterPlayer />}
    </div>
  );
}

function App() {
  return (
    <PlayerProvider>
      <Router>
        <AppContent />
      </Router>
    </PlayerProvider>
  );
}

export default App;
