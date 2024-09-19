import styles from "./styles.module.css";
import Search from "../../components/Search";
import Gallery from "../../components/Gallery";
import OtherWorks from "../../components/OtherWorks";
import ErrorBoundary from "../../components/ErrorBoundary";

const Main: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.Main}>
        <ErrorBoundary>
          <div className={styles.searchWrapper}>
            <Search />
          </div>
          <div className={styles.galleryWrapper}>
            <Gallery />
          </div>
          <div className={styles.otherWorksWrapper}>
            <OtherWorks />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Main;
