import styles from "./Header.module.scss";
import Searchbar from "./Searchbar";
import { Button, IconButton } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";
import { useStore } from "../../store";

const LinkBehaviorSignup = forwardRef((props, ref) => (
  <RouterLink to="/account/signup" {...props} />
));
const LinkBehaviorLogin = forwardRef((props, ref) => (
  <RouterLink to="/account/login" {...props} />
));

const Header = () => {
  const { currentUser } = useStore();
  return (
    <div className={styles.header}>
      <Searchbar />

      {currentUser.length === 0 ? (
        <>
          <Button
            variant="outlined"
            className={styles.button}
            component={LinkBehaviorSignup}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            className={styles.button}
            component={LinkBehaviorLogin}
          >
            Login
          </Button>
        </>
      ) : (
        <IconButton className={styles.button}>
          <i className="far fa-user"></i>
        </IconButton>
      )}
    </div>
  );
};
export default Header;
