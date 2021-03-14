import styles from "./index.module.scss";
import { Paper } from "@material-ui/core";

const FormSuccess = ({ values }) => {
  return (
    <div className={styles.signupRight}>
      <Paper className={styles.formPaper}>
        <div className={styles.form}>
          <h1>Thank you {values.username} for register!</h1>
          <img
            className={styles.formImg2}
            src={"/images/thumbsUp.png"}
            alt="success"
          />
          <p>Click here to go to the login page</p>
        </div>
      </Paper>
    </div>
  );
};

export default FormSuccess;
