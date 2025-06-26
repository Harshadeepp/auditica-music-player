// src/components/MainContent.js
import React, { useEffect, useState, useContext, useRef } from "react";
import "../styles/MainContent.css";
import axios from "axios";
import { PlayerContext } from '../context/PlayerContext';

const MainContent = () => {
  const [playlist, setPlaylistLocal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setPlaylist, setCurrentIndex, setIsPlaying, recentlyPlayed, currentIndex, playlist: globalPlaylist, stopCurrentAudio } = useContext(PlayerContext);

  // Featured track state
  const [featured, setFeatured] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [featuredError, setFeaturedError] = useState(null);

  // New releases state
  const [newReleases, setNewReleases] = useState([]);
  const [newReleasesLoading, setNewReleasesLoading] = useState(true);
  const [newReleasesError, setNewReleasesError] = useState(null);
  const [newReleasesShowAll, setNewReleasesShowAll] = useState(false);
  const [newReleasesLimit, setNewReleasesLimit] = useState(10);

  // Recommendations state
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(true);
  const [recommendationsError, setRecommendationsError] = useState(null);
  const [recommendationsShowAll, setRecommendationsShowAll] = useState(false);
  const [recommendationsLimit, setRecommendationsLimit] = useState(8);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/music/playlist");
        setPlaylistLocal(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tracks. Please try again.");
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      setFeaturedLoading(true);
      setFeaturedError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/music/featured");
        setFeatured(res.data);
        setFeaturedLoading(false);
      } catch (err) {
        setFeaturedError("Failed to load featured track.");
        setFeaturedLoading(false);
      }
    };
    fetchFeatured();

    const fetchNewReleases = async () => {
      setNewReleasesLoading(true);
      setNewReleasesError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/music/newreleases?limit=${newReleasesLimit}`);
        setNewReleases(res.data);
        setNewReleasesLoading(false);
      } catch (err) {
        setNewReleasesError("Failed to load new releases.");
        setNewReleasesLoading(false);
      }
    };
    fetchNewReleases();

    const fetchRecommendations = async () => {
      setRecommendationsLoading(true);
      setRecommendationsError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/music/recommendations?limit=${recommendationsLimit}`);
        setRecommendations(res.data);
        setRecommendationsLoading(false);
      } catch (err) {
        setRecommendationsError("Failed to load recommendations.");
        setRecommendationsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  // Handle card click to play track
  const handlePlayTrack = (index) => {
    setPlaylist(playlist);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="main-content">
      {/* Featured Song */}
      <div
        className="featured-banner"
        style={{ background: featured && featured.cover ? `url(${featured.cover}) center/cover no-repeat` : "url(/assets/Music.png) center/cover no-repeat" }}
      >
        <div className="text">
          {featuredLoading ? (
            <>
              <h1>Loading...</h1>
              <p>Loading featured track...</p>
            </>
          ) : featuredError ? (
            <>
              <h1>Error</h1>
              <p>{featuredError}</p>
            </>
          ) : featured ? (
            <>
              <h1>{featured.title}</h1>
              <p>{featured.artist}</p>
              <button
                onClick={() => {
                  stopCurrentAudio();
                  setPlaylist([featured]);
                  setCurrentIndex(0);
                  setIsPlaying(true);
                }}
              >
                Play
              </button>
            </>
          ) : (
            <>
              <h1>Music</h1>
              <p>Discover your next favorite song</p>
            </>
          )}
        </div>
      </div>

      {/* New Releases */}
      <div className="section">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h3>New Releases</h3>
          <button
            className="see-more-btn"
            onClick={() => {
              if (newReleasesShowAll) {
                setNewReleasesLimit(10);
                setNewReleasesShowAll(false);
              } else {
                setNewReleasesLimit(30);
                setNewReleasesShowAll(true);
              }
            }}
            style={{marginLeft: 16, padding: '0.3em 1em', borderRadius: 8, border: 'none', background: '#e94057', color: '#fff', fontWeight: 600, cursor: 'pointer'}}
          >
            {newReleasesShowAll ? 'See Less' : 'See More'}
          </button>
        </div>
        <div className="main-scroll-wrapper">
          <div className="horizontal-scroll">
            {newReleasesLoading ? (
              <div className="loader">Loading...</div>
            ) : newReleasesError ? (
              <div className="error">{newReleasesError}</div>
            ) : (
              newReleases.map((track, i) => (
                <div key={i} className="card" onClick={() => {
                  stopCurrentAudio();
                  setPlaylist(newReleases);
                  setCurrentIndex(i);
                  setIsPlaying(true);
                }} style={{cursor: 'pointer'}}>
                  <img
                    src={track.cover || "/assets/Music.png"}
                    alt={track.title}
                  />
                  <p>{track.title}</p>
                  <span>{track.artist}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* You May Like */}
      <div className="section">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h3>You May Like</h3>
          <button
            className="see-more-btn"
            onClick={() => {
              if (recommendationsShowAll) {
                setRecommendationsLimit(8);
                setRecommendationsShowAll(false);
              } else {
                setRecommendationsLimit(24);
                setRecommendationsShowAll(true);
              }
            }}
            style={{marginLeft: 16, padding: '0.3em 1em', borderRadius: 8, border: 'none', background: '#e94057', color: '#fff', fontWeight: 600, cursor: 'pointer'}}
          >
            {recommendationsShowAll ? 'See Less' : 'See More'}
          </button>
        </div>
        <div className="circle-scroll">
          {recommendationsLoading ? (
            <div className="loader">Loading...</div>
          ) : recommendationsError ? (
            <div className="error">{recommendationsError}</div>
          ) : (
            recommendations.map((rec, i) => (
              <div key={i} className="circle-card" onClick={() => {
                stopCurrentAudio();
                setPlaylist([{...rec, artist: rec.artist, title: rec.title, preview: rec.sample, cover: rec.cover}]);
                setCurrentIndex(0);
                setIsPlaying(true);
              }} style={{cursor: 'pointer'}}>
                <img
                  src={rec.cover || "/assets/Music.png"}
                  alt={rec.artist}
                />
                <p>{rec.artist}</p>
                <span style={{fontSize: '0.95em', color: '#bbb'}}>{rec.title}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recently Played */}
      <div className="section">
        <h3>Recently Played</h3>
        <div className="recently-played-table">
          <div className="rp-header">
            <div className="rp-col rp-idx"></div>
            <div className="rp-col rp-art"></div>
            <div className="rp-col rp-title">Title</div>
            <div className="rp-col rp-artist">Artist</div>
            <div className="rp-col rp-album">Album</div>
            <div className="rp-col rp-duration">Duration</div>
            <div className="rp-col rp-like"></div>
            <div className="rp-col rp-more"></div>
          </div>
          {recentlyPlayed.length === 0 ? (
            <div className="empty">No recently played tracks yet.</div>
          ) : (
            recentlyPlayed.map((track, i) => {
              // Find index in global playlist for play logic and highlight
              const idxInPlaylist = globalPlaylist.findIndex(t => t.preview === track.preview);
              const isCurrent = idxInPlaylist === currentIndex;
              return (
                <div
                  key={i}
                  className={`rp-row${isCurrent ? ' playing' : ''}`}
                  onClick={() => {
                    stopCurrentAudio();
                    setPlaylist(globalPlaylist);
                    setCurrentIndex(idxInPlaylist);
                    setIsPlaying(true);
                  }}
                  style={{cursor: 'pointer'}}
                >
                  <div className="rp-col rp-idx">
                    {isCurrent ? (
                      <img src="/assets/pause.png" alt="Playing" style={{width:18}} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="rp-col rp-art">
                    <img src={track.cover || "/assets/Music.png"} alt={track.title} className="rp-art-img" />
                  </div>
                  <div className="rp-col rp-title">{track.title}</div>
                  <div className="rp-col rp-artist">{track.artist}</div>
                  <div className="rp-col rp-album">{track.album || '-'}</div>
                  <div className="rp-col rp-duration">
                    {track.duration ? `${Math.floor(track.duration/60)}:${(track.duration%60).toString().padStart(2,'0')}` : ''}
                  </div>
                  <div className="rp-col rp-like">
                    <img src="/assets/like.png" alt="Like" style={{width:18}} />
                  </div>
                  <div className="rp-col rp-more">
                    <img src="/assets/more.png" alt="More" style={{width:18}} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
