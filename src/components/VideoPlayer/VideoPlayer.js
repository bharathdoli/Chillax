// src/components/VideoPlayer/VideoPlayer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css'

function VideoPlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState('');

  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODRiNGI1MmViMmJmZWMzMjZmYzYyZTVmNmFkNzBkNCIsIm5iZiI6MTcyNTIxNzI3My4xNjc3MzEsInN1YiI6IjY2ZDRiN2Q2ODI4YjdlMTM0MDMwMDQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gFpXJ3FqIhiNJ0iVSUBnIKxDfd7Z2pbCm54d1DSkAPM'
        }
      };

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then(response => response.json())
      .then(data => setMovie(data))
      .catch(err => console.error('Error fetching movie details:', err));

    // Fetch movie video
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(data => {
        const trailer = data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setVideoKey(trailer.key);
        }
      })
      .catch(err => console.error('Error fetching movie video:', err));
  }, [id]);

  return (
    <div className="video-player">
      {movie && (
        <div>
          <h2 align="center">{movie.title}</h2>
          {videoKey ? (
            <iframe
              width="100%"
              height="700px"
              src={`https://www.youtube.com/embed/${videoKey}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={movie.title}
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
