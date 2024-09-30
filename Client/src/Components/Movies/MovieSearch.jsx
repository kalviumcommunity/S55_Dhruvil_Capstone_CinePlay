import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MovieSearch.css';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 2) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=664b721083b8e799062c66715170dcbf&query=${query}`);
      setResults(response.data.results);
    } else {
      setResults([]);
    }
  };

  const handleResultClickInternal = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="movie-search-container">
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={query}
        onChange={handleInputChange}
        className="movie-search-input"
      />
      {results.length > 0 && (
        <ul className="movie-search-results">
          {results.map(movie => (
            <li key={movie.id} onClick={() => handleResultClickInternal(movie.id)} className="movie-search-item">
              {movie.poster_path && (
                <img 
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                  alt={movie.title} 
                  className="movie-search-poster"
                />
              )}
              <span className="movie-search-title">{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;
