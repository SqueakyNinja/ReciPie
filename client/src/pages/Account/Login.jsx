import React, { useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import styles from "./index.module.scss";
import axios from "axios";
import { validateLoginInfo } from "./validation";

const Login = ({ setSignup, setIsLogedin }) => {
  function handlePage() {
    setSignup(true);
    setIsLogedin(false);
  }

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const sendLogin = async () => {
    try {
      const user = {
        username: values.username,
        password: values.password,
      };
      console.log({ user });
      // const postUser = await axios.post("/users", { user });
      // return postUser;
    } catch (error) {
      console.log(error);
      console.log("YOU GOT AN ERROR");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateLoginInfo(values));
    if (Object.keys(errors).length === 0) {
      sendLogin();
      setIsSubmitted(false);
      console.log("Logged in!");
    } else {
      console.log(errors);
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
