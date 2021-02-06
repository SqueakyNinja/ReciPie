import styles from "./Header.module.scss";
import Searchbar from "./Searchbar";

const Header = () => (
  <div className={styles.header}>
    <Searchbar/>
    <p>Sign up</p>
    <i className="far fa-user"></i>
  </div>
);
export default Header;
