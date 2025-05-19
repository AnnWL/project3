import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard.jsx";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/movies");
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setMovies(data.movies);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;

  return (
    <div className="movieList">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
