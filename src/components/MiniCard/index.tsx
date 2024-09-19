import { Artwork } from "constants/interfaces";
import ButtonFav from "../ButtonFav/index";
import styles from "./styles.module.css";

const MiniCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const url = `/#/art?id=${art.id}`;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.miniCard}>
          <a href={url}>
            <img
              className={styles.image}
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`}
              alt=""
            />
          </a>

          <div className={styles.info}>
            <h4>
              {art.title && art.title.length > 20
                ? `${art.title.slice(0, 20)}...`
                : art.title || "None"}
            </h4>
            <p className={styles.author}>
              {art.artist_title && art.artist_title.length > 15
                ? `${art.artist_title.slice(0, 15)}...`
                : art.artist_title || "None"}
            </p>
            <p>{art.is_on_view ? "Public" : "Private"}</p>
          </div>

          <ButtonFav art={art} />
        </div>
      </div>
    </>
  );
};

export default MiniCard;
