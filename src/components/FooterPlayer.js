// src/components/FooterPlayer.js
import React from "react";
import "../styles/FooterPlayer.css";

const FooterPlayer = () => {
  return (
    <div className="footer-player">
      <div className="song-info">
        <img src="/assets/songs/song1.jpg" alt="current" className="song-image" />
        <div className="song-details">
          <p className="song-title">On The Ground</p>
          <span className="song-artist">Rosé</span>
        </div>
      </div>
      <div className="controls">
        <button className="control-button">
          <img
            src="/assets/backward.png"
            alt="Backward"
            style={{ filter: "invert(1)", width: 28, height: 28 }}
          />
        </button>
        <button className="control-button">
          <img
            src="/assets/pause.png"
            alt="Pause"
            style={{ filter: "invert(1)", width: 32, height: 32 }}
          />
        </button>
        <button className="control-button">
          <img
            src="/assets/forwad.png"
            alt="Forward"
            style={{ filter: "invert(1)", width: 28, height: 28 }}
          />
        </button>
        <input type="range" className="progress-bar" min="0" max="100" />
      </div>
      <div className="volume">
        <img
          src="/assets/volume.png"
          alt="Volume"
          className="volume-icon"
          style={{ filter: "invert(1)" }}
        />
        <input
          type="range"
          min="0"
          max="100"
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default FooterPlayer;
