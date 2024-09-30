import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';
import MovieSearch from './MovieSearch';

const MovieDetails = ({ movieId: propMovieId }) => {
  const { movieId: paramMovieId } = useParams();
  const id = paramMovieId || propMovieId || '550'; // Default movie ID (e.g., Fight Club)
  const [movie, setMovie] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=664b721083b8e799062c66715170dcbf`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovie(data);
        setBackgroundImage(`https://image.tmdb.org/t/p/original${data.backdrop_path}`);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='search-bar'><MovieSearch /></div>
      <div className="movie-details-inner">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
          <p className="movie-overview">{movie.overview}</p>
          <p className="movie-genres">
            {movie.genres.map(genre => genre.name).join(', ')}
          </p>
          <p className="movie-details">
            <strong>Original Release:</strong> {movie.release_date}
          </p>
          <p className="movie-details">
            <strong>Running Time:</strong> {movie.runtime} mins
          </p>
          <p className="movie-details">
            <strong>Box Office:</strong> ${movie.revenue.toLocaleString()}
          </p>
          <p className="movie-details">
            <strong>Vote Average:</strong> {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
