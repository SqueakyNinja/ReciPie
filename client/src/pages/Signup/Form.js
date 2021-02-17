import React, { useState } from "react";

import FormSuccess from "./FormSuccess";
import "./Form.css";
import Image from "./signup1.jpg";
import Signup from "./Signup";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="form-container">
      <span className="close-btn">x</span>
      <div className="form-content-left">
        <img src={Image} alt="pie" className="form-img" />
      </div>
      {!isSubmitted ? <Signup submitForm={submitForm} /> : <FormSuccess />}
    </div>
  );
};

export default Form;
