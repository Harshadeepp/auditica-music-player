// src/components/RightSidebar.js
import React, { useEffect, useState, useContext } from "react";
import "../styles/RightSidebar.css";
import axios from "axios";
import { PlayerContext } from '../context/PlayerContext';

const categoryImages = [
  "/assets/pop.png",
  "/assets/chill.png",
  "/assets/christmas.png",
  "/assets/romance.png",
  "/assets/workout.png",
];

const categories = ["Pop", "Chill", "Christmas", "Romance", "Workout"];

const RightSidebar = () => {
  const [topStreams, setTopStreams] = useState([]);
  const [topStreamsLoading, setTopStreamsLoading] = useState(true);
  const [topStreamsError, setTopStreamsError] = useState(null);
  const [topStreamsShowAll, setTopStreamsShowAll] = useState(false);
  const [topStreamsLimit, setTopStreamsLimit] = useState(10);
  const { setPlaylist, setCurrentIndex, setIsPlaying, stopCurrentAudio } = useContext(PlayerContext);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const fetchTopStreams = async () => {
      setTopStreamsLoading(true);
      setTopStreamsError(null);
      try {
        const res = await axios.get(`http://localhost:5000/api/music/topstreams?limit=${topStreamsLimit}`);
        setTopStreams(res.data);
        setTopStreamsLoading(false);
      } catch (err) {
        setTopStreamsError("Failed to load top streams.");
        setTopStreamsLoading(false);
      }
    };
    fetchTopStreams();

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const res = await axios.get("http://localhost:5000/api/music/categories");
        setCategories(res.data);
        setCategoriesLoading(false);
      } catch (err) {
        setCategoriesError("Failed to load categories.");
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, [topStreamsLimit]);

  const handleCategoryClick = async (tag) => {
    setCategoryLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/music/category?tag=${encodeURIComponent(tag)}`);
      if (res.data && res.data.length > 0) {
        stopCurrentAudio();
        setPlaylist(res.data);
        setCurrentIndex(0);
        setIsPlaying(true);
      }
    } catch (err) {
      // Optionally show an error
    }
    setCategoryLoading(false);
  };

  return (
    <div className="right-sidebar">
      <div className="top-streams">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.5px",
              marginBottom: "1.5rem",
              fontSize: "1.5rem",
              color: "#e94057",
            }}
          >
            Top Streams Real-time
          </h3>
          <button
            className="see-more-btn"
            onClick={() => {
              if (topStreamsShowAll) {
                setTopStreamsLimit(10);
                setTopStreamsShowAll(false);
              } else {
                setTopStreamsLimit(30);
                setTopStreamsShowAll(true);
              }
            }}
            style={{marginLeft: 16, padding: '0.3em 1em', borderRadius: 8, border: 'none', background: '#e94057', color: '#fff', fontWeight: 600, cursor: 'pointer'}}
          >
            {topStreamsShowAll ? 'See Less' : 'See More'}
          </button>
        </div>
        <ul>
          {topStreamsLoading ? (
            <li>Loading...</li>
          ) : topStreamsError ? (
            <li style={{color: '#e94057'}}>{topStreamsError}</li>
          ) : (
            topStreams.map((track, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.7rem 1rem",
                  borderRadius: "8px",
                  marginBottom: "0.5rem",
                  background: i === 0 ? "linear-gradient(90deg, #e94057 0%, #8a2387 100%)" : "#232526",
                  color: i === 0 ? "#fff" : "#eee",
                  fontWeight: i === 0 ? 700 : 500,
                  boxShadow: i === 0 ? "0 2px 8px #e9405733" : "none",
                  borderLeft: i === 0 ? "4px solid #fff" : "none",
                  transition: "background 0.2s, color 0.2s",
                  cursor: 'pointer',
                }}
                onClick={() => {
                  stopCurrentAudio();
                  setPlaylist(topStreams);
                  setCurrentIndex(i);
                  setIsPlaying(true);
                }}
              >
                <span style={{ fontSize: "1.1rem", maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</span>
                <span style={{ fontSize: "0.95rem", opacity: 0.8, marginLeft: 8 }}>{track.artist}</span>
                <span style={{ fontSize: "0.95rem", opacity: 0.8, marginLeft: 8 }}>{track.duration ? `${Math.floor(track.duration/60)}:${(track.duration%60).toString().padStart(2,'0')}` : ''}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="categories">
        <h3
          style={{
            fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.5px",
            marginBottom: "1.2rem",
            fontSize: "1.5rem",
            color: "#e94057",
          }}
        >
          Categories
        </h3>
        <div className="category-list">
          {categoriesLoading ? (
            <div className="loader">Loading...</div>
          ) : categoriesError ? (
            <div className="error">{categoriesError}</div>
          ) : (
            categories.map((cat, i) => (
              <div
                key={i}
                className={`category ${cat.tag}`}
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  minHeight: "120px",
                  boxShadow: "0 2px 12px #0002",
                  paddingTop: "80px",
                  marginBottom: "0.5rem",
                  border: "1.5px solid #333",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: categoryLoading ? 'not-allowed' : 'pointer',
                  opacity: categoryLoading ? 0.6 : 1,
                }}
                onClick={() => !categoryLoading && handleCategoryClick(cat.tag)}
              >
                <div
                  className="category-overlay"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    borderRadius: "10px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "1.2rem",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', 'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: "#fff",
                      margin: 0,
                      letterSpacing: "0.5px",
                      textShadow: "0 2px 8px #0008",
                    }}
                  >
                    {cat.name}
                  </h4>
                </div>
                {categoryLoading && <div className="category-loading-overlay" style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'1.1rem'}}>Loading...</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
