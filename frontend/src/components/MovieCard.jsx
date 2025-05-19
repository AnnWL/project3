import React from "react";
import "./Movie.module.css"; // 可选的样式文件

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  return (
    <div className="movieCard">
      <img src={posterUrl} alt={movie.title} className="moviePoster" />
      <h3>{movie.title}</h3>
      <p>{movie.tagline}</p>
      <p>
        ⭐ {movie.vote_average} | 🕒 {movie.runtime} min
      </p>
    </div>
  );
};

export default MovieCard;
