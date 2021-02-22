import React, { useState } from "react";

import FormSuccess from "./FormSuccess";
import styles from "./index.module.scss";
import Image from "./signup1.jpg";
import Signup from "./Signup";
import Login from "./Login";

const Form = () => {
  const [signup, setSignup] = useState(true);
  const [isLogedin, setIsLogedin] = useState(false);

  function loginForm() {
      setIsLogedin(true);
  }
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupLeft}>
        <img src={Image} alt="pie" className={styles.formImg} />
      </div>
      {signup && <Signup setIsLogedin={setIsLogedin} signup={signup} setSignup={setSignup}/>}
      {isLogedin && <Login setIsLogedin={setIsLogedin} signup={signup} setSignup={setSignup}/>}

    </div>
  );
};

export default Form;
