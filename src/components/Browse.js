// src/components/Browse.js
import React, { useState, useEffect, useContext, useRef } from "react";
import "../styles/Browse.css";
import Marquee from "react-marquee-slider";
import axios from "axios";
import { PlayerContext } from '../context/PlayerContext';

const Browse = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const searchTimeout = useRef(null);
  const [latestSongs, setLatestSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [latestLimit, setLatestLimit] = useState(10);
  const { setPlaylist, setCurrentIndex, setIsPlaying, stopCurrentAudio } = useContext(PlayerContext);

  useEffect(() => {
    const fetchLatestSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/music/newreleases?limit=${latestLimit}`);
        setLatestSongs(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load latest songs.");
        setLoading(false);
      }
    };
    fetchLatestSongs();
  }, [latestLimit]);

  // Search effect
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/music/search?query=${encodeURIComponent(search)}`);
        setSearchResults(res.data);
        setSearchLoading(false);
      } catch (err) {
        setSearchError("Failed to search. Try again.");
        setSearchLoading(false);
      }
    }, 400); // debounce
    return () => clearTimeout(searchTimeout.current);
  }, [search]);

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
      <div className="modern-search-bar-container">
        <span className="modern-search-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="7" stroke="#bbb" strokeWidth="1.5"/>
            <path d="M15.2 15.2L13 13" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          className="modern-search-bar"
          type="text"
          placeholder="What do you want to play?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') setSearch(query); }}
        />
        {query && (
          <>
            <span className="modern-search-divider" />
            <button
              className="modern-search-clear"
              onClick={() => { setQuery(""); setSearch(""); }}
              tabIndex={0}
              aria-label="Clear search"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5.5" y="8.5" width="9" height="7" rx="1.5" stroke="#bbb" strokeWidth="1.2"/>
                <path d="M8 10.5V14.5" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M12 10.5V14.5" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M7 8.5V7.5C7 6.94772 7.44772 6.5 8 6.5H12C12.5523 6.5 13 6.94772 13 7.5V8.5" stroke="#bbb" strokeWidth="1.2"/>
                <path d="M4 8.5H16" stroke="#bbb" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Search Results */}
      {search && (
        <div className="search-results-section">
          {searchLoading ? (
            <div className="loader">Searching...</div>
          ) : searchError ? (
            <div className="error">{searchError}</div>
          ) : searchResults.length === 0 ? (
            <div className="empty">No results found.</div>
          ) : (
            <div className="search-results-list">
              {searchResults.map((track, i) => (
                <div
                  key={i}
                  className="search-result-row"
                  onClick={() => {
                    stopCurrentAudio();
                    setPlaylist(searchResults);
                    setCurrentIndex(i);
                    setIsPlaying(true);
                  }}
                  style={{cursor: 'pointer'}}
                >
                  <img src={track.cover || "/assets/Music.png"} alt={track.title} className="search-result-art" />
                  <div className="search-result-info">
                    <div className="search-result-title">{track.title}</div>
                    <div className="search-result-artist">{track.artist}</div>
                  </div>
                  <div className="search-result-album">{track.album || '-'}</div>
                  <div className="search-result-duration">
                    {track.duration ? `${Math.floor(track.duration/60)}:${(track.duration%60).toString().padStart(2,'0')}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
          <button
            className="see-more-btn"
            onClick={() => {
              if (showAll) {
                setLatestLimit(10);
                setShowAll(false);
              } else {
                setLatestLimit(30);
                setShowAll(true);
              }
            }}
            style={{marginLeft: 16, padding: '0.3em 1em', borderRadius: 8, border: 'none', background: '#e94057', color: '#fff', fontWeight: 600, cursor: 'pointer'}}
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
        <div className="latest-songs-grid">
          {loading ? (
            <div className="loader">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            latestSongs.map((song, i) => (
              <div className="latest-song-row" key={i} onClick={() => {
                stopCurrentAudio();
                setPlaylist(latestSongs);
                setCurrentIndex(i);
                setIsPlaying(true);
              }} style={{cursor: 'pointer'}}>
                <img src={song.cover || "/assets/Music.png"} alt={song.title} className="song-cover" />
                <div className="song-info">
                  <div className="song-title">{song.title}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <div className="song-menu">⋯</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
