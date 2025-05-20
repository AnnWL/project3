import React, { use, useEffect, useState } from "react";
import styles from "./MoviePage.module.css";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

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

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/review/${id}/reviews`
      );
      const data = await response.json();

      console.log("Fetched Reviews Data:", JSON.stringify(data, null, 2));

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (id) fetchReviews(); // ✅ Now fetchReviews is accessible
  }, [id]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        if (!movie || !movie.ext_id) return;

        const response = await fetch(
          `http://localhost:5001/api/movies/${movie.ext_id}/cast`
        );
        const data = await response.json();
        console.log("Fetched Cast Data:", data.cast);

        // Store only character name and name
        setCast(
          data.cast.map((castItem) => ({
            name: castItem.name,
            character: castItem.character,
            id: castItem.actor?._id,
            profile_path: castItem.profile_path,
          }))
        );
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movie?.ext_id]); // ✅ Now fetchCast is accessible

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
        await fetchReviews(); // ✅ Call fetchReviews to update UI
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
              <p>{movie.description}</p>
              <p>⭐ Rating: {movie.vote_average?.toFixed(1)}</p>
              <p>
                Release Date:{" "}
                {format(new Date(movie.releaseDate), "MMMM d, yyyy")}
              </p>
            </>
          ) : (
            <p>Loading movie details...</p>
          )}

          {movie?.genre && movie.genre.length > 0 ? (
            <p>
              <strong>Genres:</strong>{" "}
              {Array.isArray(movie.genre)
                ? movie.genre.join(", ")
                : movie.genre}
            </p>
          ) : (
            <p>No genre information available.</p>
          )}

          {/* ✅ Display cast list */}
          <h3>Cast:</h3>
          {cast.length > 0 ? (
            <ul className={styles.castList}>
              {cast.slice(0, 8).map((actor) => (
                <li key={actor.id} className={styles.castItem}>
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                      alt={actor.name}
                      className={styles.castImage}
                    />
                  ) : (
                    <div className={styles.castImagePlaceholder}></div>
                  )}
                  <div className={styles.castText}>
                    <strong>{actor.name}</strong>
                    <div className={styles.characterText}>
                      as {actor.character}
                    </div>
                  </div>
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
