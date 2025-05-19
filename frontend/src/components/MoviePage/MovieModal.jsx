import React from "react";
import "./Modal.css";

const MovieModal = ({ movie, actors, onClose, onActorClick }) => {
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
            {actors.map((actor) => (
              <li key={actor.id}>
                <button onClick={() => onActorClick(actor)}>
                  {actor.name}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
