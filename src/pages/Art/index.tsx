import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchArt } from "../../utils/api";
import { Artwork } from "constants/interfaces";
import ButtonFav from "../../components/ButtonFav";

const Art: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("id"));

  const [getArt, setArt] = useState<Artwork>();
  const [imgUrl, setImgUrl] = useState("./ImageTest.png");
  const [loadere, setLoader] = useState(false);

  useEffect(() => {
    fetchArt(id)
      .then((resp) => {
        setArt(resp.data as unknown as Artwork);
        setLoader(true);
        console.log(getArt, resp.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (getArt?.image_id)
      setImgUrl(
        `https://www.artic.edu/iiif/2/${getArt?.image_id}/full/400,/0/default.jpg`,
      );
  }, [loadere]);

  return (
    <div className="container">
      <div className={styles.artPage}>
        {loadere ? (
          <div className={styles.artWrapper}>
            <div className={styles.artImageBox}>
              <div className={styles.artBookmark}>
                {getArt ? <ButtonFav art={getArt} /> : ""}
              </div>
              <img className={styles.artImage} src={imgUrl} alt="Artwork" />
            </div>

            <div className={styles.artInfo}>
              <div>
                <h2 className={styles.artName}>{getArt?.title}</h2>
                <p className={styles.artAuthor}>{getArt?.artist_display}</p>
                <p className={styles.artYear}>{getArt?.date_display}</p>
              </div>

              <div className={styles.artOverviewBox}>
                <h2 className={styles.artOverview}>Overview</h2>
                <p className={styles.artNacionality}>
                  <span>Artist nacionality: </span>
                  {getArt?.place_of_origin}
                </p>
                <p className={styles.artDimensions}>
                  <span>Dimensions: Sheet: </span>
                  {getArt?.dimensions}
                </p>
                <p className={styles.artCreditLine}>
                  <span>Credit Line: </span>
                  {getArt?.credit_line}
                </p>
                <p className={styles.artRepository}>
                  <span>Repository: </span>
                  {getArt?.place_of_origin}
                </p>
                <p className={styles.artStatus}>
                  {getArt?.is_on_view ? "Public" : "Private"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          "FETCHING DATA"
        )}
      </div>
    </div>
  );
};

export default Art;
