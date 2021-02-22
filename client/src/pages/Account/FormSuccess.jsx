import styles from "./index.module.scss";

const FormSuccess = () => {
  return (
    <div className={styles.signupRight}>
      <div className={styles.formSuccess}>
        <h1>We have received your request!</h1>
        <img
          className={styles.formImg2}
          src={"/images/thumbsUp.png"}
          alt="success"
        />
      </div>
    </div>
  );
};

export default FormSuccess;
