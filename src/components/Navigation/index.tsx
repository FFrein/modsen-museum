import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {isHomePage ? (
          ""
        ) : (
          <li className={styles.element}>
            <img src="./home.png" />
            <a href="/">Home</a>
          </li>
        )}
        <li className={styles.element}>
          <img src="./bookmark.png" />
          <a href="/#/fav">Your favorites</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
