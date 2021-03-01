import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button, TextField, Paper } from "@material-ui/core";
import { validateSignupInfo } from "./validation";
import styles from "./index.module.scss";
import FormSuccess from "./FormSuccess";
import { addNewUser, sendLogin } from "../../api/users";
import { LoginRequest, NewUser } from "../../../../common";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../store";

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
  const { setSnackbar, setCurrentUser } = useStore();
  const history = useHistory();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const isSubmitted = useRef<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const values = useRef<Values>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    values.current = {
      ...values.current,
      [name]: value,
    };
    if (!isSubmitted.current) {
      setErrors(validateSignupInfo(values.current));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (Object.keys(errors).length === 0) {
      const newUser: NewUser = {
        username: values.current.username,
        email: values.current.email,
        password: values.current.password,
      };
      try {
        const newUserSuccess = await addNewUser(newUser);
        setSnackbar(newUserSuccess.data.reqNewUser, "success");
        const newLoginData: LoginRequest = {
          username: values.current.username,
          password: values.current.password,
        };
        const newLoginTry = await sendLogin(newLoginData);
        setCurrentUser(newLoginTry.user_id);
        isSubmitted.current = true;
        history.push("/");
      } catch (error) {
        setSnackbar(error.response.data.message, "error");
      }
    } else {
      setSnackbar("Please resolve all errors and try again!", "error");
    }
  };

  return isSubmitted ? (
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
              value={values.current.username}
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
              value={values.current.email}
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
              value={values.current.password}
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
              value={values.current.password2}
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
