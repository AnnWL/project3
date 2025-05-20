import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import ActorList from "./ActorList";
import LoginButton from "./LoginButton";
import TopRatedMovies from "./TopRatedMovies";
import styles from "./LandingPage.module.css";
import RegisterButton from "./RegisterButton";

const LandingPage = ({ user, setUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("movies");
  const [genreFilter, setGenreFilter] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [favouriteMovieIds, setFavouriteMovieIds] = useState([]);

  const addFavouriteMovie = (movie) => {
    setFavouriteMovieIds((prev) =>
      prev.includes(movie.ext_id)
        ? prev.filter((id) => id !== movie.ext_id)
        : [...prev, movie.ext_id]
    );
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  // Fetch genres only once for movie search
  useEffect(() => {
    if (searchType === "movies") {
      const fetchGenres = async () => {
        try {
          const res = await fetch("/api/movies/genres");
          const data = await res.json();
          if (data.status === "ok") {
            setGenres(data.genres || []);
          }
        } catch (error) {
          console.error("Error fetching genres:", error);
        }
      };
      fetchGenres();
    }
  }, [searchType]);

  // Fetch search results when searchTerm, genreFilter, or searchType changes
  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm.trim()) return; // Skip empty search

      try {
        if (searchType === "movies") {
          const params = new URLSearchParams();
          params.append("keyword", searchTerm);
          if (genreFilter) params.append("genre", genreFilter);

          const res = await fetch(`/api/movies/search?${params.toString()}`);
          const data = await res.json();
          if (data.status === "ok") {
            setMovies(data.movies || []);
            setActors([]);
          }
        } else if (searchType === "actors") {
          const params = new URLSearchParams();
          params.append("name", searchTerm);

          const res = await fetch(`/api/actors/search?${params.toString()}`);
          const data = await res.json();
          if (data.status === "ok") {
            setActors(data.actors || []);
            setMovies([]);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [searchTerm, genreFilter, searchType]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.movieTitle}>
        <div className={styles.leftSection}>
          <h1>🎬 Movie App</h1>
          {user && <h2 className={styles.welcome}>Welcome {user.username}!</h2>}
        </div>
        {!user && (
          <div className={styles.buttonGroup}>
            <LoginButton setUser={setUser} /> {/* ✅ Pass setUser */}
            <RegisterButton setUser={setUser} />
          </div>
        )}
      </div>

      <div className={styles.searchRow}>
        <label>
          Search for:{" "}
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchTerm("");
              setMovies([]);
              setActors([]);
              setGenreFilter("");
            }}
          >
            <option value="movies">Movies</option>
            <option value="actors">Actors</option>
          </select>
        </label>

        {searchType === "movies" && (
          <div className={styles.genres}>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        )}

        <SearchBar onSearch={setSearchTerm} />
      </div>

      {searchTerm.trim() ? (
        <>
          <h2 className={styles.sectionTitle}>Search Results</h2>
          {searchType === "movies" ? (
            <MovieList
              movies={movies}
              favouriteMovieIds={favouriteMovieIds}
              addFavouriteMovie={user ? addFavouriteMovie : null}
            />
          ) : (
            <ActorList actors={actors} />
          )}
        </>
      ) : (
        <>
          {loading && <p>Loading movies...</p>}
          {error && <p className={styles.error}>Error: {error}</p>}
          {!loading && !error && (
            <TopRatedMovies
              movies={movies}
              favouriteMovieIds={favouriteMovieIds}
              addFavouriteMovie={user ? addFavouriteMovie : null}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;
