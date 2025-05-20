import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import FavouriteButton from "./FavouriteButton.jsx";

const MovieList = ({ movies, favouriteMovieIds = [], addFavouriteMovie }) => {
  if (!movies.length) return <p>No movies found.</p>;

  return (
    <div className={styles.movieList}>
      <div className={styles.row}>
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
                {Array.isArray(movie.genres)
                  ? movie.genres.map((genre) => genre.name).join(", ") // ✅ Extracts names from objects
                  : movie.genres}
              </p>
              <p className={styles.rating}>
                <strong>Rating:</strong>{" "}
                {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
              {movie?._id ? (
                <div>
                  <Link to={`/movies/${movie._id}`} className={styles.readMore}>
                    Read more →
                  </Link>
                  <div className={styles.favourite}>
                    <FavouriteButton
                      isFavourite={favouriteMovieIds.includes(movie.ext_id)}
                      onClick={
                        addFavouriteMovie
                          ? () => addFavouriteMovie(movie)
                          : null
                      }
                      disabled={!addFavouriteMovie}
                    />
                  </div>
                </div>
              ) : (
                <p style={{ color: "red" }}>Movie ID missing!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
