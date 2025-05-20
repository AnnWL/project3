import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const MovieList = ({ movies }) => {
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div key={movie._id} className={styles.movieCard}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
          )}
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{movie.title}</h3>
            <p className={styles.genre}>
              <strong>Genre:</strong>{" "}
              {Array.isArray(movie?.genres)
                ? movie.genres.map((item) => item.name).join(", ")
                : genres || "N/A"}
            </p>
            <p className={styles.rating}>
              <strong>Rating:</strong> {movie.vote_average?.toFixed(1) || "N/A"}
            </p>
            {movie?._id ? (
              <Link to={`/movies/${movie._id}`} className={styles.readMore}>
                Read more →
              </Link>
            ) : (
              <p style={{ color: "red" }}>Movie ID missing!</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
