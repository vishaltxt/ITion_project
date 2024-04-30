import React, { useState, useEffect } from "react";
import MovieCard from "./components/moviecard";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    language: [],
    country: [],
    genre: []
  });

  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      });
  }, []);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    let filteredResults = movies.filter((movie) => {
      return (
        (filters.language.length === 0 || filters.language.includes(movie.movielanguages[0])) &&
        (filters.country.length === 0 || filters.country.includes(movie.moviecountries[0])) &&
        (filters.genre.length === 0 || filters.genre.some((genre) => movie.moviegenres.includes(genre)))
      );
    });
    setFilteredMovies(filteredResults);
  };

  return (
    <div className="App">
      <div className="filters">
        <h2>Filters:</h2>
        <div className="language">
          <h3>Languages:</h3>
          {movies.length > 0 &&
            [...new Set(movies.flatMap((movie) => movie.movielanguages))].map(
              (language) => (
                <div key={language}>
                  <input
                    type="checkbox"
                    id={language}
                    value={language}
                    checked={filters.language.includes(language)}
                    onChange={(e) =>
                      handleFilterChange(
                        "language",
                        e.target.checked
                          ? [...filters.language, e.target.value]
                          : filters.language.filter((lang) => lang !== e.target.value)
                      )
                    }
                  />
                  <label htmlFor={language}>{language}</label>
                </div>
              )
            )}
        </div>
      </div>
      <div className="movies">
        <h2>Movies:</h2>
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbmovieid} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
