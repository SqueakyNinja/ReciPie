import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, TextField, Paper, Snackbar } from "@material-ui/core";
import { validateSignupInfo } from "./validation";
import styles from "./index.module.scss";
import FormSuccess from "./FormSuccess";
import { addNewUser } from "../../api/users";
import { NewUser } from "../../../../common";
import { Link } from "react-router-dom";
import SnackbarComponent from "../../components/SnackbarComponent";

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}

interface Values {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Signup = () => {
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Values>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    setErrors(validateSignupInfo(values));
  }, [values]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      const newUser: NewUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        console.log("Logging in!");
        const newUserSuccess = await addNewUser(newUser);
        setSnackbarMessage(newUserSuccess.data.reqNewUser);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setIsSubmitted(false);
        setIsSubmitted(false);
      } catch (error) {
        console.log(error.response.data.message);
        setSnackbarMessage(error.response.data.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage("Please resolve all errors and try again!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return !isSubmitted ? (
    <div className={styles.signupRight}>
      <SnackbarComponent message={message} type={type} />
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
            {errors.username && submitting && <p>{errors.username}</p>}
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
            {errors.email && submitting && <p>{errors.email}</p>}
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
            {errors.password && submitting && <p>{errors.password}</p>}
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
            {errors.password2 && submitting && <p>{errors.password2}</p>}
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
            <Link to="/account/login">Login here</Link>
          </span>
        </form>
      </Paper>
    </div>
  ) : (
    <FormSuccess values={values} />
  );
};

export default Signup;
