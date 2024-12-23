import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODRiNGI1MmViMmJmZWMzMjZmYzYyZTVmNmFkNzBkNCIsIm5iOiIxNzI1MTQwMzM2Iiwic3ViIjoiNjY0YjdjNmUzMjQ4YjNlMmE0YmYzNTA4ZDYzZGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DuB1qTLvRXAo8sld1k4LE5Msft_TugA9R3izUn14J9c'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(response => response.json())
      .then(data => setMovieDetail(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movieDetail) return <div>Loading...</div>;

  return (
    <div className="MovieDetail">
      <h2>{movieDetail.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`} alt={movieDetail.title} />
      <p>{movieDetail.overview}</p>
      {/* Add a video player or other interactive elements here */}
    </div>
  );
};

export default MovieDetail;
