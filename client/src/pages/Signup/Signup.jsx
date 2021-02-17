import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./Form.css";
import useForm from "./useForm";
import validate from "./validateInfo";
import styles from "./index.module.scss";

const Signup = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Sign up today and start register your own recipes!</h1>
        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <TextField
            className={styles.input}
            variant="outlined"
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <TextField
            className={styles.input}
            variant="outlined"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <TextField
            className={styles.input}
            variant="outlined"
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm Password
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
        <Button variant="contained" type="submit" className={styles.button}>
          Sign up
        </Button>
        <span className="form-input-login">
          Already have an account? Login here
        </span>
      </form>
    </div>
  );
};

export default Signup;
