import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import LoginButton from "../components/LoginButton";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState("all");

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data.movies || []);
    };
    fetchMovies();
  }, []);

  const handleSearch = (term) => setSearchTerm(term);

  const handleFilter = (filterType) => setFiltered(filterType);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isTopRated = filtered === "top" ? movie.rating >= 8 : true;
    return matchesSearch && isTopRated;
  });

  return (
    <div className="movies">
      <h1>🎬 Movie App</h1>
      <LoginButton />

      <br />
      <SearchBar onSearch={handleSearch} />

      <br />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default LandingPage;
