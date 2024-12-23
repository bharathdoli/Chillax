import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Pages = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODRiNGI1MmViMmJmZWMzMjZmYzYyZTVmNmFkNzBkNCIsIm5iOiIxNzI1MTQwMzM2Iiwic3ViIjoiNjY0YjdjNmUzMjQ4YjNlMmE0YmYzNTA4ZDYzZGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DuB1qTLvRXAo8sld1k4LE5Msft_TugA9R3izUn14J9c'
    }
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => setUpcomingMovies(data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="Pages">
      <h2>Upcoming Movies</h2>
      <div className="movie-grid">
        {upcomingMovies.map(movie => (
          <div className="movie-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pages;
