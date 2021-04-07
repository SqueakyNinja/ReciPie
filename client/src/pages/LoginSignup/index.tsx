import styles from "./index.module.scss";
import Signup from "./Signup";
import Login from "./Login";
import { Route } from "react-router-dom";

const Account = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupLeft}>
        <img src={"/images/berries.jpg"} alt="pie" className={styles.formImg} />
      </div>
      <div className={styles.signupRight}>
        <Route exact path="/account/signup" component={Signup} />
        <Route exact path="/account/login" component={Login} />
      </div>
    </div>
  );
};

export default Account;
