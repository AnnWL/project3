import React from "react";
import styles from "./LandingPage.module.css";

const FavouriteButton = ({ isFavourite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={styles.heartButton}
      style={{
        color: isFavourite ? "red" : "black",
        background: "none",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
      }}
    >
      {isFavourite ? "❤️" : "♡"}
    </button>
  );
};

export default FavouriteButton;
