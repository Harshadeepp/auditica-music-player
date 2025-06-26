const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

router.get('/song', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=1&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No tracks found' });
    }

    const track = data.results[0];
    res.json({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,            // MP3 preview URL (complete track)
      cover: track.album_image,
      duration: track.duration,
    });
  } catch (err) {
    console.error("Jamendo API error", err);
    res.status(500).json({ error: 'Failed to fetch from Jamendo' });
  }
});

// New endpoint: /playlist
router.get('/playlist', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No tracks found' });
    }
    const playlist = data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
    }));
    res.json(playlist);
  } catch (err) {
    console.error("Jamendo API error", err);
    res.status(500).json({ error: 'Failed to fetch playlist from Jamendo' });
  }
});

// New endpoint: /search
router.get('/search', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Missing search query' });
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&namesearch=${encodeURIComponent(query)}&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.json([]);
    }
    const results = data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
      album: track.album_name || '',
    }));
    res.json(results);
  } catch (err) {
    console.error("Jamendo API search error", err);
    res.status(500).json({ error: 'Failed to search Jamendo' });
  }
});

// New endpoint: /featured
router.get('/featured', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    // Get 10 popular tracks, pick one at random
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&order=popularity_total&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No featured track found' });
    }
    // Pick a random track from the results
    const track = data.results[Math.floor(Math.random() * data.results.length)];
    res.json({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
      album: track.album_name || '',
    });
  } catch (err) {
    console.error("Jamendo API featured error", err);
    res.status(500).json({ error: 'Failed to fetch featured track' });
  }
});

// New endpoint: /newreleases
router.get('/newreleases', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit > 50) limit = 50;
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&order=releasedate&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No new releases found' });
    }
    const results = data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
      album: track.album_name || '',
    }));
    res.json(results);
  } catch (err) {
    console.error("Jamendo API new releases error", err);
    res.status(500).json({ error: 'Failed to fetch new releases' });
  }
});

// New endpoint: /recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    let limit = parseInt(req.query.limit, 10) || 8;
    if (limit > 24) limit = 24;
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&order=popularity_total&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No recommendations found' });
    }
    // Group by artist, pick one track per artist
    const seen = new Set();
    const recommendations = [];
    for (const track of data.results) {
      if (!seen.has(track.artist_id)) {
        recommendations.push({
          artist: track.artist_name,
          cover: track.artist_image || track.album_image,
          sample: track.audio,
          title: track.name,
        });
        seen.add(track.artist_id);
      }
      if (recommendations.length >= limit) break;
    }
    res.json(recommendations);
  } catch (err) {
    console.error("Jamendo API recommendations error", err);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// New endpoint: /topstreams
router.get('/topstreams', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    let limit = parseInt(req.query.limit, 10) || 10;
    if (limit > 50) limit = 50;
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=${limit}&order=popularity_week&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No top streams found' });
    }
    const results = data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
      album: track.album_name || '',
    }));
    res.json(results);
  } catch (err) {
    console.error("Jamendo API top streams error", err);
    res.status(500).json({ error: 'Failed to fetch top streams' });
  }
});

// New endpoint: /categories
router.get('/categories', (req, res) => {
  // You can expand this list as needed
  res.json([
    { tag: 'pop', name: 'Pop', image: '/assets/pop.png' },
    { tag: 'chill', name: 'Chill', image: '/assets/chill.png' },
    { tag: 'christmas', name: 'Christmas', image: '/assets/christmas.png' },
    { tag: 'romance', name: 'Romance', image: '/assets/romance.png' },
    { tag: 'workout', name: 'Workout', image: '/assets/workout.png' },
    { tag: 'hiphop', name: 'Hip Hop', image: '/assets/hiphop.png' },
    { tag: 'jazz', name: 'Jazz', image: '/assets/jazz.png' },
    { tag: 'podcast', name: 'Podcast', image: '/assets/podcast.png' },
  ]);
});

// New endpoint: /category?tag=...
router.get('/category', async (req, res) => {
  try {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const { tag } = req.query;
    if (!tag) return res.status(400).json({ error: 'Missing tag' });
    const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=json&limit=10&order=popularity_total&fuzzytags=${encodeURIComponent(tag)}&audioformat=mp32&include=musicinfo`;
    const { data } = await axios.get(url);
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: 'No tracks found for this category' });
    }
    const results = data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      preview: track.audio,
      cover: track.album_image,
      duration: track.duration,
      album: track.album_name || '',
    }));
    res.json(results);
  } catch (err) {
    console.error("Jamendo API category error", err);
    res.status(500).json({ error: 'Failed to fetch category tracks' });
  }
});

module.exports = router;
