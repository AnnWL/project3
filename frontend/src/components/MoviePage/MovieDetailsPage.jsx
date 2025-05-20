import React, { use, useEffect, useState } from "react";
import styles from "./MoviePage.module.css";
import { useParams, Link } from "react-router-dom";

const MovieDetailsPage = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/movies/${id}`);
        if (!response.ok) throw new Error("Failed to fetch movie data");

        const data = await response.json();
        console.log("Movie Data:", data);
        setMovie(data.movie);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Failed to load movie details. Please try again.");
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/review/${id}/reviews`
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

    if (id) fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/movies/${id}/cast`
        );
        const data = await response.json();
        console.log("Fetched Cast Data:", data.cast); // Debugging

        // Store only character name and original name
        setCast(
          data.cast.map((actor) => ({
            original_name: actor.original_name,
            character: actor.character,
            id: actor.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    if (id) fetchCast();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/review/${id}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rating, comment: review }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Review added:", data);
        // ✅ Update reviews state immediately
        setReviews((prevReviews) => [...prevReviews, data.newReview]);
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
      <div className={styles.modalContent}>
        {movie ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <p>Loading movie poster...</p>
        )}

        <div className={styles.modalText}>
          {movie ? (
            <>
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>⭐ Rating: {movie.vote_average?.toFixed(1)}</p>
              <p>Release Date: {movie.release_date}</p>
            </>
          ) : (
            <p>Loading movie details...</p>
          )}

          {movie?.genres?.length > 0 ? (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          ) : (
            <p>No genre information available.</p>
          )}

          {/* ✅ Display cast list */}
          <h3>Cast:</h3>
          {movie?.cast?.length > 0 ? (
            <ul>
              {cast.map((actor) => (
                <li key={actor.id}>
                  <strong>{actor.original_name}</strong> as {actor.character}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading cast...</p>
          )}

          {/* Back to Home link */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/" className={styles.backLink}>
              <strong>← Back to Home</strong>
            </Link>
          </div>

          <h3>Reviews:</h3>
          <ul>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.user?.username ?? "Anonymous"}:</strong>{" "}
                  {review.comment} (⭐ {review.rating})
                </li>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
          </ul>

          {/* ✅ Show review button only if user is logged in */}
          {user ? (
            <button onClick={() => setShowReviewPopup(true)}>
              Leave a review
            </button>
          ) : (
            <p>You must be logged in to leave a review.</p>
          )}

          {/* <button onClick={onClose}>Close</button>
          <button onClick={() => setShowReviewPopup(true)}>
            Leave a review
          </button> */}
        </div>
      </div>

      <br />
      {showReviewPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Write a Review</h3>
            <textarea
              placeholder="Share your thoughts..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <label>Rating (1-10):</label>
            <input
              type="number"
              min="1"
              max="10"
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
