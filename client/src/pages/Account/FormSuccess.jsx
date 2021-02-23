import styles from "./index.module.scss";
import Signup from "./Signup";

const FormSuccess = ({ values }) => {
  return (
    <div className={styles.signupRight}>
      <div className={styles.formSuccess}>
        <h1>Thank you {values.username} for register!</h1>
        <img
          className={styles.formImg2}
          src={"/images/thumbsUp.png"}
          alt="success"
        />
        <p>Click here to go to the login page</p>
      </div>
    </div>
  );
};

export default FormSuccess;
