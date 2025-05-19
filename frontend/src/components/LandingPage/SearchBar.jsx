import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, searchType }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        placeholder={`Type search term here...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.searchBar}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
