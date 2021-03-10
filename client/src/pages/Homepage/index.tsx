import styles from "./index.module.scss";

const Homepage = () => {
  return (
    <>
      <div className={styles.grid}>
        <img src={"/images/pie.png"} alt="Pie" />
      </div>
    </>
  );
};

export default Homepage;
