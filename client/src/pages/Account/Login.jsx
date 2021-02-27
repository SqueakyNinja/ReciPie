import React, { useEffect, useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import styles from "./index.module.scss";
import { validateLoginInfo } from "./validation";
import { sendLogin } from "../../api/users";
import { Link } from "react-router-dom";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setErrors(validateLoginInfo(values));
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      const user = {
        username: values.username,
        password: values.password,
      };
      try {
        await sendLogin(user);
        setIsSubmitted(false);
        console.log("Logged in!");
      } catch (error) {
        console.dir(error);
        console.log(error.response.data.message);
      }
      setSubmitting(false);
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
            {errors.username && submitting && <p>{errors.username}</p>}
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
            {errors.password && submitting && <p>{errors.password}</p>}
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
            Don't have an account?
            <Link to="/account/signup">Sign up here</Link>
          </span>
        </form>
      </Paper>
    </div>
  ) : (
    <>"user submitted"</>
  );
};

export default Login;
