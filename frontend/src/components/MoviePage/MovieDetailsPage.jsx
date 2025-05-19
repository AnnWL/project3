import React, { useEffect, useState } from "react";
import styles from "./MoviePage.module.css";

const MovieDetailsPage = ({ movieId, actors, onClose, onActorClick }) => {
  const [movie, setMovie] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [error,setError] = useState(null)

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/movies/${movieId}/reviews`
        );
        const data = await response.json();
        if (response.ok) {
          setReviews(data.reviews);
        } else {
          console.error("Failed to fetch reviews:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (movieId) fetchReviews();
  }, [movieId]);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/movies/${movieId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: review }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Review added:", data);
        setShowReviewPopup(false);
      } else {
        console.error("Review submission failed:", data.msg);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
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
          <h3>Reviews:</h3>
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.user.username}:</strong> {review.comment} (⭐{" "}
                  {review.rating})
                </li>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
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
