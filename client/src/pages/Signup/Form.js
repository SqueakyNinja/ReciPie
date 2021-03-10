import React, { useState } from "react";
import FormSuccess from "./FormSuccess";
import styles from "./index.module.scss";
import Image from "./signup1.jpg";
import Signup from "./Signup";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupLeft}>
        <img src={Image} alt="pie" className={styles.formImg} />
      </div>
      {!isSubmitted ? <Signup submitForm={submitForm} /> : <FormSuccess />}
    </div>
  );
};

export default Form;
