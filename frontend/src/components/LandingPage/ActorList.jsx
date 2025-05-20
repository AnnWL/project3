import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

const ActorList = ({ actors }) => {
  if (!actors.length) return <p>No actors found.</p>;

  return (
    <div className={styles.movieListActor}>
      {actors.map((actor) => (
        <div key={actor._id} className={styles.movieCardAactor}>
          {actor.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.posterActor}
            />
          )}
          <div className={styles.cardContentActor}>
            <h3 className={styles.titleActor}>{actor.name}</h3>
            <p className={styles.descriptionActor}>
              {actor.biography?.slice(0, 100) || "No bio available"}...
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
