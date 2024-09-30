import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import MovieDetails from './MovieDetails';
import './Movies.css';

const Movies = () => {
  return (
    <div className="movies-page">
      <Routes>
        <Route path="/" element={<MovieDetails movieId="550" />} /> {/* Default movie */}
        <Route path="/movie/:movieId" element={<MovieDetails />} /> {/* Movie details route */}
        <Route path="/search" element={<MovieSearch />} /> {/* Movie search route */}
      </Routes>
    </div>
  );
};

export default Movies;
