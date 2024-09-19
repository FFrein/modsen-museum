import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import MiniCard from "../MiniCard/index";
import { searchSchema } from "../../constants/validation";
import * as yup from "yup";
import { fetchByText } from "../../utils/api";

const Search: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [paintings, setPaintings] = useState<any[]>([]);
  const [sortedPaintings, setSortedPaintings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        handleSearch();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  const sortPaintings = (paintingsList: any[], option: string) => {
    const sorted = [...paintingsList].sort(
      (a, b) => a[option]?.localeCompare(b[option] ?? "") || 0,
    );
    setSortedPaintings(sorted);
  };

  useEffect(() => {
    if (paintings.length) {
      sortPaintings(paintings, sortOption);
    }
  }, [sortOption, paintings]);

  const handleSearch = async () => {
    try {
      await searchSchema.validate({ search });
      setError("");

      try {
        const result = await fetchByText(search);
        const data = result.data;
        setPaintings(data);
        sortPaintings(data, sortOption);
      } catch (fetchError) {
        console.error("Network error: ", fetchError);
        setError(
          "Failed to fetch data. Please check your internet connection.",
        );
      }
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.message);
      } else {
        setError("Error finding data");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setLoader(search.length > 0);
  }, [search]);

  return (
    <section className={styles.search}>
      <div className={styles.searchTitleWrapper}>
        <h1 className={styles.searchTitle}>
          Let's Find Some
          <span> Art </span>
          Here!
        </h1>
      </div>

      <div className={styles.searchInputWrapper}>
        <div className={styles.searchBlock}>
          <input
            type="text"
            placeholder="Enter the text"
            value={search}
            onChange={handleChange}
            className={styles.searchInput}
          />
          <img className="Search-Image" src="./search.png" />
        </div>

        {loader ? (
          <div className={styles.searchList}>
            <div className={styles.searchContainer}>
              <div className={styles.searchOptions}>
                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.sorting}>
                  <label htmlFor="sort">Sort by: </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="title">Name</option>
                    <option value="artist_title">Author</option>
                  </select>
                </div>
              </div>

              <div className={styles.results}>
                {sortedPaintings.map((e) => (
                  <MiniCard key={e.id} art={e} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Search;
