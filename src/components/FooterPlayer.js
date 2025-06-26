// src/components/FooterPlayer.js
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "../styles/FooterPlayer.css";
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate } from "react-router-dom";

const FooterPlayer = () => {
  const {
    playlist,
    setPlaylist,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying,
    recentlyPlayed,
    setRecentlyPlayed,
    audioRef,
    stopCurrentAudio
  } = useContext(PlayerContext);
  const [song, setSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Default to 30s for Jamendo previews
  const [volume, setVolume] = useState(1); // 1 is 100%
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off'); // 'off', 'one', 'all'
  const navigate = useNavigate();

  // Fetch playlist only if not already loaded
  useEffect(() => {
    if (playlist.length > 0) {
      setLoading(false);
      setError(null);
      return;
    }
    const fetchPlaylist = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/music/playlist");
        setPlaylist(res.data);
        setCurrentIndex(0);
        setLoading(false);
      } catch (err) {
        setError("Failed to load playlist. Please try again.");
        setLoading(false);
      }
    };
    fetchPlaylist();
    // eslint-disable-next-line
  }, []);

  // Update song and audio when playlist or currentIndex changes
  useEffect(() => {
    if (!playlist.length) return;
    const currentSong = playlist[currentIndex];
    setSong(currentSong);

    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    if (currentSong) {
      const newAudio = new Audio(currentSong.preview);
      newAudio.volume = volume;
      audioRef.current = newAudio;

      newAudio.addEventListener("loadeddata", () => {
        setDuration(newAudio.duration || currentSong.duration || 30);
        setCurrentTime(0);
      });
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
      newAudio.addEventListener("timeupdate", () => {
        setCurrentTime(newAudio.currentTime);
      });
      newAudio.addEventListener('play', () => setIsPlaying(true));
      newAudio.addEventListener('pause', () => setIsPlaying(false));
    }
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [playlist, currentIndex]);

  // Update audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Seek handler
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Format time helper
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Play/pause button handler
  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      } else {
        await audioRef.current.pause();
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };

  // Volume slider handler
  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  // Shuffle and Repeat handlers
  const handleShuffleToggle = () => {
    setShuffle((prev) => !prev);
  };
  const handleRepeatToggle = () => {
    setRepeat((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  // Next/Previous handlers (with shuffle/repeat)
  const handleNext = () => {
    if (shuffle && playlist.length > 1) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * playlist.length);
      } while (nextIdx === currentIndex && playlist.length > 1);
      setCurrentIndex(nextIdx);
    } else if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (repeat === 'all') {
      setCurrentIndex(0);
    }
  };
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (repeat === 'all') {
      setCurrentIndex(playlist.length - 1);
    }
  };

  // Auto-advance on song end
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      if (repeat === 'one') {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNext();
      }
    };
    audioRef.current.addEventListener('ended', handleEnded);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [repeat, shuffle, playlist, currentIndex]);

  // Add to recently played when a new song starts playing
  useEffect(() => {
    if (!playlist.length) return;
    const currentSong = playlist[currentIndex];
    if (!currentSong) return;
    if (!isPlaying) return;
    setRecentlyPlayed(prev => {
      // Remove if already exists
      const filtered = prev.filter(track => track.preview !== currentSong.preview);
      // Add to front, limit to 10
      return [currentSong, ...filtered].slice(0, 10);
    });
    // eslint-disable-next-line
  }, [currentIndex, isPlaying]);

  if (loading) {
    return (
      <div className="footer-player loading">
        <span>Loading song...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="footer-player error">
        <span>{error}</span>
      </div>
    );
  }

  if (!song) return null;

  return (
    <div className="footer-player">
      {/* Left controls */}
      <div className="footer-left">
        <button
          className={`footer-icon-btn${shuffle ? ' active' : ''}`}
          onClick={handleShuffleToggle}
          aria-pressed={shuffle}
        >
          <img src="/assets/shuffle.png" alt="Shuffle" />
        </button>
        <button className="footer-icon-btn" onClick={handlePrevious} disabled={currentIndex === 0 && repeat !== 'all'}>
          <img src="/assets/previous.png" alt="Previous" />
        </button>
        <button className="footer-icon-btn play" onClick={handlePlayPause}>
          <img
            src={`/assets/${isPlaying ? "pause" : "play"}.png`}
            alt={isPlaying ? "Pause" : "Play"}
          />
        </button>
        <button className="footer-icon-btn" onClick={handleNext} disabled={currentIndex === playlist.length - 1 && repeat !== 'all'}>
          <img src="/assets/next.png" alt="Next" />
        </button>
        <button
          className={`footer-icon-btn${repeat !== 'off' ? ' active' : ''}`}
          onClick={handleRepeatToggle}
          aria-pressed={repeat !== 'off'}
        >
          <img src="/assets/repeat.png" alt="Repeat" />
        </button>
      </div>

      {/* Center song info and progress */}
      <div className="footer-center">
        <div className="song-info-row">
          <div className="song-image-container">
            <img src={song.cover} alt="Song" className="song-image" />
          </div>
          <div className="song-info">
            <div className="song-details">
              <p className="song-title">{song.title}</p>
              <span className="song-artist">{song.artist}</span>
            </div>
          </div>
        </div>
        <div className="progress">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
          />
          <span className="time-label">{formatTime(duration)}</span>
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
        <button className="footer-icon-btn" onClick={() => navigate('/more')}>
          <img src="/assets/more.png" alt="More" />
        </button>
        <div className="volume-control">
          <img src="/assets/volume.png" alt="Volume" />
          <input
            type="range"
            min="0"
            max="100"
            className="volume-slider"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FooterPlayer;
