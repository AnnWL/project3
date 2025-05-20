import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ActorPage.module.css";

const ActorPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/actors/${id}`);
        const data = await response.json();
        setActor(data.actor);
      } catch (error) {
        console.error("Failed to fetch actor:", error);
      }
    };

    fetchActor();
  }, [id]);

  if (!actor) return <p>Loading actor details...</p>;
  const getGenderLabel = (gender) => {
    if (gender === 1) return "Female";
    if (gender === 2) return "Male";
    return "Other";
  };
  return (
    <div className={styles.actorPage}>
      <div className={styles.actorHeader}>
        <img
          src={
            actor.profile_path
              ? `${imageBaseUrl}${actor.profile_path}`
              : "fallback.jpg"
          }
          alt={actor.name}
        />
        <div className={styles.actorDetails}>
          <h1>{actor.name}</h1>
          <p>
            <strong>Gender:</strong> {getGenderLabel(actor.gender)}
          </p>
          <p>
            <strong>Birthday:</strong>{" "}
            {actor.birthday
              ? new Date(actor.birthday).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Place of Birth:</strong> {actor.place_of_birth || "N/A"}
          </p>
          <p>
            <strong>Nationality:</strong> {actor.nationality || "N/A"}
          </p>
        </div>
      </div>

      <div className={styles.actorBio}>
        <h2>Biography</h2>
        <p>{actor.biography || "No biography available."}</p>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ActorPage;
