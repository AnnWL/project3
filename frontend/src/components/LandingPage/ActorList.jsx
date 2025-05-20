import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const ActorList = ({ actors }) => {
  if (!actors.length) return <p>No actors found.</p>;

  return (
    <div className={styles.movieList}>
      {actors.map((actor) => (
        <div key={actor._id} className={styles.movieCard}>
          {actor.profile_path && (
            <img
              src={`${imageBaseUrl}${actor.profile_path}`}
              alt={actor.name}
              className={styles.poster}
            />
          )}
          <div className={styles.cardContent}>
            <h3 className={styles.title}>{actor.name}</h3>
            <p className={styles.description}>
              {actor.bio?.slice(0, 100) || "No bio available"}...
            </p>
            <Link to={`/actors/${actor._id}`} className={styles.readMore}>
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActorList;
