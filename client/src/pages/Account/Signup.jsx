import React, { useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { validateSignupInfo } from "./validation";
import styles from "./index.module.scss";
import FormSuccess from "./FormSuccess";
import axios from "axios";

const Signup = ({ setSignup, setIsLogedin }) => {
  axios.defaults.baseURL = "http://localhost:9090/api";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addNewUser = async () => {
    try {
      const user = {
        username: values.username,
        email: values.email,
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
    setErrors(validateSignupInfo(values));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      addNewUser();
      setIsSubmitted(true);
    }
  };

  const handlePage = () => {
    setSignup(false);
    setIsLogedin(true);
  };

  return !isSubmitted ? (
    <div className={styles.signupRight}>
      <Paper className={styles.formPaper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Sign up today and start register your own recipes!</h1>
          <div className={styles.formInputs}>
            <label htmlFor="username" className={styles.formLabel}>
              Username
            </label>
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
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <TextField
              className={styles.input}
              variant="outlined"
              id="email"
              type="email"
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className={styles.formInputs}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <TextField
              variant="outlined"
              id="password"
              type="password"
              name="password"
              label="Password"
              className={styles.input}
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className={styles.formInputs}>
            <label htmlFor="password2" className={styles.formLabel}>
              Repeat Password
            </label>
            <TextField
              id="password2"
              type="password"
              name="password2"
              label="Repeat your password"
              className={styles.input}
              variant="outlined"
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={styles.button}
          >
            Sign up
          </Button>
          <span className="form-input-login">
            Already have an account?
            <span onClick={handlePage}>Login here</span>
          </span>
        </form>
      </Paper>
    </div>
  ) : (
    <FormSuccess />
  );
};

export default Signup;
