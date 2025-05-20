import React, { use, useEffect, useState } from "react";
import styles from "./MoviePage.module.css";
import { useParams, Link } from "react-router-dom";

const MovieDetailsPage = () => {
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
          `http://localhost:5001/api/movies/${id}/reviews`
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
    try {
      const response = await fetch(
        `http://localhost:5001/api/movies/${id}/reviews`,
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
        {/* <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        /> */}
        <div className="modal-text">
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

          {movie?.belongs_to_collection?.length > 0 ? (
            <p>
              <strong>Genres:</strong>{" "}
              {movie.belongs_to_collection
                .map((genre) => genre.name)
                .join(", ")}
            </p>
          ) : (
            <p>No genre information available.</p>
          )}
          {cast.length > 0 ? (
            <>
              <h3>Main Cast:</h3>
              <ul>
                {cast.map((actor) => (
                  <li key={actor.id}>
                    {actor.original_name} as {actor.character}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No cast information available.</p>
          )}

          {/* Back to Home link */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link to="/" className={styles.backLink}>
              ← Back to Home
            </Link>
          </div>

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
          {/* <button onClick={onClose}>Close</button> */}
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
