import styles from "./styles.module.css";

const Title: React.FC<any> = ({ title, text }) => {
  return (
    <div className={styles.titleBox}>
      <p className={styles.titleBoxtext}>{text || "Title"}</p>
      <h2 className={styles.titleBoxtitle}>{title || "Title"}</h2>
    </div>
  );
};

export default Title;
