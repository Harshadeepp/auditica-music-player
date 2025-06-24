// src/components/FooterPlayer.js
import React from "react";
import "../styles/FooterPlayer.css";

const FooterPlayer = () => {
  return (
    <div className="footer-player">
      {/* Left controls */}
      <div className="footer-left">
        <button className="footer-icon-btn">
          <img src="/assets/shuffle.png" alt="Shuffle" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/previous.png" alt="Previous" />
        </button>
        <button className="footer-icon-btn play">
          <img src="/assets/pause.png" alt="Pause" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/next.png" alt="Next" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/repeat.png" alt="Repeat" />
        </button>
      </div>

      {/* Center song info and progress */}
      <div className="footer-center">
        <div className="song-info-row">
          <div className="song-image-container">
            <img src="/assets/songs/song1.jpg" alt="Song" className="song-image" />
          </div>
          <div className="song-info">
            <div className="song-details">
              <p className="song-title">On The Ground</p>
              <span className="song-artist">Rosé</span>
            </div>
          </div>
        </div>
        <div className="progress">
          <span className="time-label">2:45</span>
          <input type="range" className="progress-bar" min="0" max="100" />
          <span className="time-label">3:27</span>
        </div>
      </div>

      {/* Right icons */}
      <div className="footer-right">
        <button className="footer-icon-btn">
          <img src="/assets/lyric.png" alt="Lyrics" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/queue.png" alt="Queue" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/like.png" alt="Like" />
        </button>
        <button className="footer-icon-btn">
          <img src="/assets/more.png" alt="More" />
        </button>
        <div className="volume-control">
          <img src="/assets/volume.png" alt="Volume" />
          <input type="range" min="0" max="100" className="volume-slider" />
        </div>
      </div>
    </div>
  );
};

export default FooterPlayer;
