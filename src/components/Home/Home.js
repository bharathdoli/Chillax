import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upComing, setUpComing] = useState([]);

  // Memoizing the options object to avoid re-creation on each render
  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODRiNGI1MmViMmJmZWMzMjZmYzYyZTVmNmFkNzBkNCIsIm5iZiI6MTcyNTIxNzI3My4xNjc3MzEsInN1YiI6IjY2ZDRiN2Q2ODI4YjdlMTM0MDMwMDQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gFpXJ3FqIhiNJ0iVSUBnIKxDfd7Z2pbCm54d1DSkAPM',
    },
  }), []); // Empty dependency array ensures options is only created once

  // Using useEffect to fetch movie data
  useEffect(() => {
    // Fetch now playing movies
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setNowPlaying(data.results))
      .catch(err => console.error('Error fetching now playing movies:', err));

    // Fetch top rated movies
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setTopRated(data.results))
      .catch(err => console.error('Error fetching top rated movies:', err));

    // Fetch popular movies
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setPopular(data.results))
      .catch(err => console.error('Error fetching popular movies:', err));

    // Fetch upcoming movies
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setUpComing(data.results))
      .catch(err => console.error('Error fetching upcoming movies:', err));
  }, [options]); // `options` is now a dependency, ensuring that it is used

  // Navigate to movie details page when card is clicked
  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="Home">
      {/* Now Playing */}
      <h2>Now Playing</h2>
      <div className="Home-container">
        {nowPlaying.map((card) => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>

      {/* Top Rated */}
      <h2>Top-Rated</h2>
      <div className="Home-container">
        {topRated.map((card) => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>

      {/* Popular */}
      <h2>Popular</h2>
      <div className="Home-container">
        {popular.map((card) => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      <h2>Upcoming</h2>
      <div className="Home-container">
        {upComing.map((card) => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
