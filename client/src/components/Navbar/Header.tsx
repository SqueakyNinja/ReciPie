import styles from "./Header.module.scss";

const Header = () => (
  <div className={styles.header}>
    <input type="text" placeholder="Search ingredients" />
    <i className="far fa-user"></i>
  </div>
);
export default Header;
