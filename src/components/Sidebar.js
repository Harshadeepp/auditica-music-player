// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import '../styles/sidebar.css';

function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      <h2 className="logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="/assets/music_logo.png"
          alt="Logo"
          style={{ height: 40, width: 40, borderRadius: "50%", boxShadow: "0 2px 8px #0003" }}
        />
        <span style={{
          fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "1px"
        }}>
          auditica
        </span>
      </h2>
      <nav>
        <ul className="sidebar-nav">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <span role="img" aria-label="Home" style={{ marginRight: 8 }}>🏠</span>
              Home
            </Link>
          </li>
          <li className={location.pathname === "/browse" ? "active" : ""}>
            <Link to="/browse" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}>
              <span role="img" aria-label="Browse" style={{ marginRight: 8 }}>🔎</span>
              Browse
            </Link>
          </li>
          <li>
            <span role="img" aria-label="Favourites" style={{ marginRight: 8 }}>❤️</span>
            Favourites
          </li>
          <li>
            <span role="img" aria-label="Library" style={{ marginRight: 8 }}>🎵</span>
            Library
          </li>
        </ul>
      </nav>
      <div className="playlist-section">
        <h4 style={{
          fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
          fontWeight: 700,
          marginTop: "2rem"
        }}>Playlists</h4>
        <ul className="playlist-list">
          <li>
            <span role="img" aria-label="Liked Songs" style={{ marginRight: 8 }}>👍</span>
            Liked Songs
          </li>
          <li>
            <span role="img" aria-label="Top Hits" style={{ marginRight: 8 }}>⭐</span>
            Top Hits
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
