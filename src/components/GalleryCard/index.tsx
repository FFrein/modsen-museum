import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ButtonFav from "../ButtonFav/index";
import { Artwork } from "constants/interfaces";

const GalleryCard: React.FC<{ art: Artwork }> = ({ art }) => {
  const [imgUrl, setImgUrl] = useState(
    `https://www.artic.edu/iiif/2/${art.image_id}/full/400,/0/default.jpg`,
  );

  useEffect(() => {
    if (!art.image_id) setImgUrl("./TestImage.png");
  }, []);
  const url = "/#/art?id=" + art.id;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <a href={url}>
          <img className={styles.image} src={imgUrl} alt="Gallery Image" />
        </a>

        <div className={styles.textOverlay}>
          <div className="info">
            <h4 className="name">{art.title || "None"}</h4>
            <p className="author">{art.artist_title || "None"}</p>
            <p className="status">{art.is_on_view ? "Public" : "Private"}</p>
          </div>

          <ButtonFav art={art} />
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
