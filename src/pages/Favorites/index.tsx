import { getFavourites } from "../../utils/storage";
import React from "react";
import MiniCard from "../../components/MiniCard";
import styles from "./styles.module.css";
import Title from "../../components/Title";

const Favourites: React.FC = () => {
  const fav = getFavourites();
  return (
    <div className="container">
      <div className={styles.fav}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            Here Are Your
            <span> Favorites </span>
          </h1>
        </div>

        <div className={styles.titleWrapper}>
          <Title title="Your favorites list" text="Saved by you" />
        </div>

        <div className={styles.favList}>
          {fav.map((e) => (
            <MiniCard key={e.id} art={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
