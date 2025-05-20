import React from "react";
import MovieList from "./MovieList";

const TopRatedMovies = ({ movies }) => {
  const filteredMovies =
    movies?.filter((movie) => movie.vote_average > 7) || [];

  if (filteredMovies.length === 0) return <p>No top-rated movies found.</p>;

  return (
    <section>
      <h2
        style={{
          color: "white",
          textAlign: "left",
          fontSize: "32px",
          marginBottom: "20px",
          marginTop: "10px",
          marginLeft: "30px",
        }}
      >
        ⭐ Top Rated Movies
      </h2>
      <MovieList movies={filteredMovies} />
    </section>
  );
};

export default TopRatedMovies;
