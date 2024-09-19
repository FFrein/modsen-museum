import styles from "./styles.module.css";
import GalleryCard from "../GalleryCard/index";
import { useEffect, useState } from "react";
import { fetchArtworks } from "../../utils/api";
import Title from "../Title";
import { Artwork } from "constants/interfaces";
import { getPaginationRange } from "../../utils/paginationUtils";

const Gallery: React.FC = () => {
  const [getArts, setArts] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({ current_page: 0 });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArtworks(page, 3)
      .then((resp) => {
        setArts(resp.data);
        setPagination(resp.pagination);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);

  function nextPage() {
    if (pagination.current_page < pagination.total_pages) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (pagination.current_page > 1) {
      setPage(page - 1);
    }
  }

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const paginationRange = getPaginationRange(pagination.total_pages, page);

  return (
    <div>
      <div className={styles.titleWrapper}>
        <Title title="Our special gallery" text="Topics for you" />
      </div>

      <div className={styles.cardsWrapper}>
        {getArts.length != 0
          ? getArts.map((e: Artwork) => <GalleryCard key={e.id} art={e} />)
          : "Fetching data"}
      </div>

      <div className={styles.paginator}>
        <div className={styles.buttons}>
          <button onClick={prevPage} className={styles.btnArrow}>
            &lt;{" "}
          </button>
          {paginationRange.map((p) => (
            <button
              key={p}
              onClick={() => handlePageClick(p)}
              className={p === page ? styles.active : styles.btnNumber}
            >
              {p}
            </button>
          ))}
          <button onClick={nextPage} className={styles.btnArrow}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
