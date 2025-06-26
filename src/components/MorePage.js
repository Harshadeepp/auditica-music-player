import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PlayerContext } from '../context/PlayerContext';
import '../styles/MorePage.css';

const MorePage = () => {
  const [topStreams, setTopStreams] = useState([]);
  const [topStreamsLoading, setTopStreamsLoading] = useState(true);
  const [topStreamsError, setTopStreamsError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const { setPlaylist, setCurrentIndex, setIsPlaying, stopCurrentAudio } = useContext(PlayerContext);

  useEffect(() => {
    const fetchTopStreams = async () => {
      setTopStreamsLoading(true);
      setTopStreamsError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/music/topstreams?limit=12');
        setTopStreams(res.data);
        setTopStreamsLoading(false);
      } catch (err) {
        setTopStreamsError('Failed to load top streams.');
        setTopStreamsLoading(false);
      }
    };
    fetchTopStreams();

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const res = await axios.get('http://localhost:5000/api/music/categories');
        setCategories(res.data);
        setCategoriesLoading(false);
      } catch (err) {
        setCategoriesError('Failed to load categories.');
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="more-modern-bg">
      <div className="more-hero">
        <h1>Explore More</h1>
        <p>Discover trending tracks and browse by category</p>
      </div>
      <div className="more-modern-container">
        <section className="more-card">
          <h2 className="more-section-title">Top Streams</h2>
          {topStreamsLoading ? (
            <div className="loader">Loading...</div>
          ) : topStreamsError ? (
            <div className="error">{topStreamsError}</div>
          ) : (
            <ul className="more-top-streams-list">
              {topStreams.map((track, i) => (
                <li
                  key={i}
                  className="more-top-streams-item"
                  onClick={() => {
                    stopCurrentAudio();
                    setPlaylist(topStreams);
                    setCurrentIndex(i);
                    setIsPlaying(true);
                  }}
                >
                  <div className="mts-title">{track.title}</div>
                  <div className="mts-artist">{track.artist}</div>
                  <div className="mts-duration">{track.duration ? `${Math.floor(track.duration/60)}:${(track.duration%60).toString().padStart(2,'0')}` : ''}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="more-card">
          <h2 className="more-section-title">Categories</h2>
          {categoriesLoading ? (
            <div className="loader">Loading...</div>
          ) : categoriesError ? (
            <div className="error">{categoriesError}</div>
          ) : (
            <div className="more-category-grid">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="more-category-card"
                  style={{ backgroundImage: `url(${cat.image})` }}
                  onClick={() => {
                    stopCurrentAudio();
                    setPlaylist(cat.tracks || []);
                    setCurrentIndex(0);
                    setIsPlaying(true);
                  }}
                >
                  <div className="more-category-overlay">
                    <span className="more-category-title">{cat.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MorePage; 