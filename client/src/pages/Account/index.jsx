import { useState } from "react";
import styles from "./index.module.scss";
import Signup from "./Signup";
import Login from "./Login";

const Account = () => {
  const [signup, setSignup] = useState(true);
  const [isLogedin, setIsLogedin] = useState(false);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupLeft}>
        <img src={"/images/signup1.jpg"} alt="pie" className={styles.formImg} />
      </div>
      {signup && <Signup setIsLogedin={setIsLogedin} setSignup={setSignup} />}
      {isLogedin && (
        <Login
          setIsLogedin={setIsLogedin}
          signup={signup}
          setSignup={setSignup}
        />
      )}
    </div>
  );
};

export default Account;
