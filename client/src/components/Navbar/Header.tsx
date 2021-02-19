import styles from "./Header.module.scss";
import Searchbar from "./Searchbar";
import { Button, IconButton } from "@material-ui/core";

const Header = () => (
  <div className={styles.header}>
    <Searchbar />

    <Button variant="outlined" className={styles.button}>
      <p>Sign up</p>
    </Button>
    <IconButton className={styles.button}>
      <i className="far fa-user"></i>
    </IconButton>
  </div>
);
export default Header;
