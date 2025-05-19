import React from "react";
import "./Modal.css";

const ActorModal = ({ actor, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
          alt={actor.name}
        />
        <div className="modal-text">
          <h2>{actor.name}</h2>
          <p>Gender: {actor.gender || "N/A"}</p>
          <p>Birthday: {actor.birthday || "N/A"}</p>
          <p>Birthday: {actor.place_of_birth || "N/A"}</p>
          <p>Biography: {actor.biography || "No biography available."}</p>
          <h3>🎬 Known for:</h3>
          <ul>
            {actor.known_for?.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ActorModal;
