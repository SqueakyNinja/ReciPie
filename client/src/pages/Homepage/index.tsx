import Background from "./pie.png";
import styles from "./index.module.scss";

const Homepage = () => {
  return (
    <>
      <div className={styles.grid}>
        <img src={Background} />
      </div>
    </>
  );
};

export default Homepage;
