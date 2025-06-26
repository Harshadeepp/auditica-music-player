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
      <nav style={{ width: '100%' }}>
        <ul className="sidebar-nav">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
              <img src="/assets/home.png" alt="Home" className="sidebar-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className={location.pathname === "/browse" ? "active" : ""}>
            <Link to="/browse" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center", gap: 14 }}>
              <img src="/assets/search.png" alt="Browse" className="sidebar-icon" />
              <span>Browse</span>
            </Link>
          </li>
          <li>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/assets/favourite.png" alt="Favourites" className="sidebar-icon" />
              <span>Favourites</span>
            </div>
          </li>
          <li>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/assets/library.png" alt="Library" className="sidebar-icon" />
              <span>Library</span>
            </div>
          </li>
        </ul>
      </nav>
      <div className="sidebar-divider" />
      <div className="playlist-section" style={{ width: '100%' }}>
        <h4 style={{
          fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
          fontWeight: 700,
          marginTop: "2rem",
          marginBottom: '0.7rem',
          letterSpacing: '0.5px',
          color: '#fff',
          fontSize: '1.1rem'
        }}>Playlists</h4>
        <ul className="playlist-list">
          <li>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/assets/liked_song.png" alt="Liked Songs" className="sidebar-icon" />
              <span>Liked Songs</span>
            </div>
          </li>
          <li>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img src="/assets/top_hits.png" alt="Top Hits" className="sidebar-icon" />
              <span>Top Hits</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
