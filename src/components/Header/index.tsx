import BurgerMenu from "../BurgerMenu/index";
import Navigation from "../Navigation/index";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div>
          <a href="/">
            <img src="./museum-logo1.svg" />
          </a>
        </div>
        <div className={styles.navContainer}>
          <div className={styles.burgerMenu}>
            <BurgerMenu />
          </div>
          <div className={styles.navigation}>
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
