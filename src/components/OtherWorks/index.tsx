import styles from "./styles.module.css";
import MiniCard from "../MiniCard";
import { useEffect, useState } from "react";
import { fetchArtworks } from "../../utils/api";
import { Artwork } from "constants/interfaces";
import Title from "../Title";

const OtherWorks: React.FC = () => {
  const [Loader, setLoader] = useState(false);
  const [Data, setData] = useState<any>([]);

  useEffect(() => {
    fetchArtworks(Math.floor(Math.random() * 100), 9)
      .then((data: any) => {
        setData(data.data);
        setLoader(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div>
        <Title title="Other works for you" text="Here some more" />
      </div>
      <div className={styles.otherCardsWrapper}>
        {Loader
          ? Data.map((e: Artwork) => <MiniCard key={e.id} art={e} />)
          : "fetching data"}
      </div>
    </div>
  );
};

export default OtherWorks;
