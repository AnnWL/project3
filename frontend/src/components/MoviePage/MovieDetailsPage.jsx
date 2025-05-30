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
  const [editableReviewId, setEditableReviewId] = useState(null);
  const [updatedRating, setUpdatedRating] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("User in MovieDetailsPage:", user);
    console.log("Reviews:", reviews);
  }, [user, reviews]);

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
    if (!user || !user.token) {
      alert("You must be logged in to submit a review.");
      console.error("Missing user token");
      return;
    }

    const reviewPayload = {
      rating,
      comment: review, // ✅ Ensure comment is included in request body
      userId: user._id,
    };

    console.log("Review Payload Sent:", reviewPayload);
    try {
      const response = await fetch(
        `http://localhost:5001/api/review/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(reviewPayload),
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

  const handleReviewUpdate = async (
    reviewId,
    updatedRating,
    updatedComment,
    reviewUsername
  ) => {
    if (!user || user.username !== reviewUsername) {
      console.error("Unauthorized: User does not match review owner");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/review/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // ✅ Send auth token
          },
          body: JSON.stringify({
            rating: updatedRating,
            comment: updatedComment,
          }),
        }
      );

      const data = await response.json();
      console.log("Review Updated:", data);

      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === reviewId
              ? { ...review, rating: updatedRating, comment: updatedComment }
              : review
          )
        );
        setEditableReviewId(null); // ✅ Close edit popup
        setMessage("Review updated"); // ✅ Show success message
        setTimeout(() => setMessage(""), 3000); // ✅ Remove message after 3 seconds
      } else {
        console.error("Review update failed:", data.msg);
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/review/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ Send auth token
          },
        }
      );

      const data = await response.json();
      console.log("Review Deleted:", data);

      if (response.ok) {
        await fetchReviews();
      } else {
        console.error("Review deletion failed:", data.msg);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
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
              <p>Release Date: {movie.release_date}</p>
            </>
          ) : (
            <p>Loading movie details...</p>
          )}

          {movie?.genres && movie.genres.length > 0 ? (
            <p>
              <strong>Genres:</strong>{" "}
              {Array.isArray(movie.genres)
                ? movie.genres.map((genre) => genre.name).join(", ") // ✅ Extracts names from objects
                : movie.genres}
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
                  <strong>{review.user?.username || "Anonymous"}:</strong>
                  {review.comment} (⭐ {review.rating})
                  {/* ✅ Allow only logged-in users to edit/delete their reviews */}
                  {user?.username === review.user?.username && (
                    <>
                      {editableReviewId === review._id ? (
                        <>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={updatedRating}
                            onChange={(e) => setUpdatedRating(e.target.value)}
                          />
                          <textarea
                            value={updatedComment}
                            onChange={(e) => setUpdatedComment(e.target.value)}
                          />

                          <button
                            onClick={() =>
                              handleReviewUpdate(
                                review._id,
                                updatedRating,
                                updatedComment,
                                review.user?.username
                              )
                            }
                          >
                            Save
                          </button>
                          <button onClick={() => setEditableReviewId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditableReviewId(review._id);
                              setUpdatedRating(review.rating);
                              setUpdatedComment(review.comment);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleReviewDelete(review._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </>
                  )}
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
