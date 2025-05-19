import React, { useEffect, useState } from "react";
import styles from "./MoviePage.module.css";

const MovieDetailsPage = ({ movieId, actors, onClose, onActorClick }) => {
  const [movie, setMovie] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/movies/${movieId}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie data");

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Failed to load movie details. Please try again.");
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  const handleReviewSubmit = () => {
    console.log("Review submitted:", { review, rating });
    setShowReviewPopup(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="modal-text">
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            ⭐ Rating: {movie.vote_average.toFixed(1)} | 🕒 {movie.runtime} min{" "}
          </p>
          <p> Release Date: {movie.release_date}</p>
          <h3>Main Cast:</h3>
          <ul>
            {actors?.length > 0 ? (
              actors.map((actor) => (
                <li key={actor.id}>
                  <button onClick={() => onActorClick(actor)}>
                    {actor.name}
                  </button>
                </li>
              ))
            ) : (
              <p>No cast information available.</p>
            )}
          </ul>
          <button onClick={onClose}>Close</button>

          <button onClick={() => setShowReviewPopup(true)}>
            Leave a review
          </button>
        </div>
      </div>

      {showReviewPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Write a Review</h3>
            <textarea
              placeholder="Share your thoughts..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <label>Rating (0-5):</label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <button onClick={handleReviewSubmit}>Submit</button>

            <button onClick={() => setShowReviewPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
