import React from "react";

const FavouriteButton = ({ isFavourite, onClick }) => {
  return (
    <button
      onClick={onClick}
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
