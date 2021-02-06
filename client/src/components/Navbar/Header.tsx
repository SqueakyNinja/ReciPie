import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <input type="text" placeholder="Search ingredients" />
    <p>Sign up</p>
    <i className="far fa-user"></i>
  </div>
);
export default Header;
