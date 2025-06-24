// src/components/MainContent.js
import React from "react";
import "../styles/MainContent.css";
import Marquee from "react-marquee-slider";

const MainContent = () => {
  return (
    <div className="main-content">
      {/* Featured Song */}
      <div
        className="featured-banner"
        style={{ background: "url(/assets/Music.png) center/cover no-repeat" }}
      >
        <div className="text">
          <h1>Music</h1>
          <p>Discover your next favorite song</p>
          <button>Listen Now</button>
        </div>
      </div>

      {/* New Releases */}
      <div className="section">
        <h3>New Releases</h3>
        <div className="main-scroll-wrapper">
          <div className="horizontal-scroll">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card">
                <img
                  src={`/assets/albums/album${(i % 3) + 1}.jpg`}
                  alt="Album"
                />
                <p>Album Title</p>
                <span>Artist</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You May Like */}
      <div className="section">
        <h3>You May Like</h3>
        <div className="circle-scroll">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="circle-card">
              <img
                src={`/assets/artists/artist${(i % 3) + 1}.jpg`}
                alt="Artist"
              />
              <p>Artist Name</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div className="section">
        <h3>Recently Played</h3>
        <div className="recently-played">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="track">
              <img src={`/assets/songs/song${i + 1}.jpg`} alt="Track" />
              <div className="info">
                <p>Song Title</p>
                <span>Artist • 3:24</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
