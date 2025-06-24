// src/components/Browse.js
import React, { useState } from "react";
import "../styles/Browse.css";
import Marquee from "react-marquee-slider";

const Browse = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
      // Add your search logic here
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <div className="main-content">
      {/* Search Bar */}
      <form className="search-container" onSubmit={handleSearch}>
        <input
          id="search-input"
          type="text"
          placeholder="Search for songs, artists, albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="search-button" type="submit">
          <span role="img" aria-label="search">
            🔍
          </span>{" "}
          Search
        </button>
      </form>

      {/* Featured Song */}
      <div className="featured-banner">
        <div className="text">
          <h1>Music</h1>
          <p>Discover your next favorite song</p>
          <button>Listen Now</button>
        </div>
      </div>

      {/* Latest Songs */}
      <div className="latest-songs-section">
        <div className="latest-songs-header">
          <h3>Latest Songs <span className="arrow">{'>'}</span></h3>
        </div>
        <div className="latest-songs-grid">
          {[
            { title: "Drive", artist: "Ed Sheeran", img: "/assets/songs/song1.jpg" },
            { title: "6 Months Later", artist: "Megan Moroney", img: "/assets/songs/song2.jpg" },
            { title: "All over me", artist: "HAIM", img: "/assets/songs/song3.jpg" },
            { title: "Outside", artist: "Cardi B", img: "/assets/songs/song4.jpg" },
            { title: "Victory Lap", artist: "Fred again.., Skepta, PlaqueBoyMax", img: "/assets/songs/song5.jpg" },
            { title: "I'd Rather Go Blind", artist: "AKIA", img: "/assets/songs/song6.jpg" },
            { title: "Papasito", artist: "KAROL G", img: "/assets/songs/song7.jpg" },
            { title: "Hammer", artist: "Lorde", img: "/assets/songs/song8.jpg" },
            { title: "Bonde Do Brunão", artist: "Bruno Mars", img: "/assets/songs/song9.jpg" },
            { title: "Mr Electric Blue", artist: "Benson Boone", img: "/assets/songs/song10.jpg" },
            { title: "GUILT TRIPPIN", artist: "Central Cee, Sexyy Red", img: "/assets/songs/song11.jpg" },
            { title: "Ghosts", artist: "YUNGBLUD", img: "/assets/songs/song12.jpg" },
          ].map((song, i) => (
            <div className="latest-song-row" key={i}>
              <img src={song.img} alt={song.title} className="song-cover" />
              <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <div className="song-menu">⋯</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
