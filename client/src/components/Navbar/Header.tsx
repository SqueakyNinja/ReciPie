import styles from "./Header.module.scss";
import Searchbar from "./Searchbar";
import { Button, IconButton } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink to="/signup" {...props} />
));

const Header = () => (
  <div className={styles.header}>
    <Searchbar />

    <Button
      variant="outlined"
      className={styles.button}
      component={LinkBehavior}
    >
      Sign Up
    </Button>
    <IconButton className={styles.button}>
      <i className="far fa-user"></i>
    </IconButton>
  </div>
);
export default Header;
