// MovieCard.js

import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.moviemainphotos[0]} alt={movie.movietitle} />
            <div className="movie-details">
                <h3>{movie.movietitle}</h3>
                <p>Languages: {movie.movielanguages.join(", ")}</p>
                <p>Country: {movie.moviecountries.join(", ")}</p>
                <p>Genres: {movie.moviegenres.join(", ")}</p>
            </div>
        </div>
    );
};

export default MovieCard;
