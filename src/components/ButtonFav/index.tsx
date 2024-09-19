import styles from "./styles.module.css";
import { FollowUnfollow } from "../../utils/storage";
import { Artwork } from "constants/interfaces";
import { useEffect, useState } from "react";
import { getFavourites } from "../../utils/storage";

const ButtonFav: React.FC<{ art: Artwork }> = ({ art }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let data = getFavourites().filter((e) => e.id == art.id);
    if (data.length > 0) {
      setIsFav(true);
    }
  }, []);

  const handlerFollowUnfollow = () => {
    FollowUnfollow(art);
    setIsFav(!isFav);
  };

  return (
    <>
      <div
        onClick={() => {
          handlerFollowUnfollow();
        }}
        className={isFav ? styles.wrapperFav : styles.wrapper}
      >
        <img className={styles.image} src="./bookmark2.png" alt="Bookmark" />
      </div>
    </>
  );
};

export default ButtonFav;
