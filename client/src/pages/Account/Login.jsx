import React, { useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import styles from "./index.module.scss";
import axios from "axios";
import validateInfo from "./validateInfo";

const Login = ({ setSignup, setIsLogedin }) => {
  const getLogin = () => {
    axios.get("/user.json").then((respons) => {
      const auth = respons.data.user;
      console.log(auth);
    });
  };

  function handlePage() {
    setSignup(true);
    setIsLogedin(false);
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validateInfo(values));
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return !isSubmitted ? (
    <div className={styles.signupRight}>
      <Paper className={styles.formPaper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Log in and start register your own recipes!</h1>
          <div className={styles.formInputs}>
            <TextField
              className={styles.input}
              variant="outlined"
              id="username"
              type="text"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          <div className={styles.formInputs}>
            <TextField
              variant="outlined"
              id="password"
              type="password"
              name="password"
              label="Repeat your Password"
              className={styles.input}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={styles.button}
          >
            Login
          </Button>
          <span className="form-input-login">
            Don't have an account?{" "}
            <span onClick={handlePage}>Sign up here</span>
          </span>
        </form>
      </Paper>
    </div>
  ) : (
    "user submitted"
  );
};

export default Login;
