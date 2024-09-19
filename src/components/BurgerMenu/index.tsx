import React, { useState, useRef } from "react";
import useOutsideClick from "../../utils/hooks";
import styles from "./styles.module.css";

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(menuRef, () => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(document.activeElement)
    ) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.burgerContainer}>
      <button
        ref={buttonRef}
        className={styles.burgerButton}
        onClick={handleToggle}
      >
        {!isOpen ? "☰" : "X"}
      </button>
      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <ul className={styles.menuList}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#/fav">Fav</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
