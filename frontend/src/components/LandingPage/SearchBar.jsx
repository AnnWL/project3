import styles from "./Movie.module.css";

const SearchBar = ({ onSearch }) => (
  <input
    type="text"
    placeholder="Search movies..."
    onChange={(e) => onSearch(e.target.value)}
    className={styles.searchBar}
  />
);

export default SearchBar;
