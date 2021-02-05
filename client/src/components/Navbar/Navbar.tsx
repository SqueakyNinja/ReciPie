import React, {
  Component,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Logo from "./ReciPie-light-logo.png";
import smallLogo from "./ReciPie-light-small-logo.png";
import { MenuItems } from "./MenuItems";
import { Button } from "../Button";
import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import { Link } from "react-router-dom";

interface navbarProps {
  expandedSidebar: boolean;
  setExpandedSidebar: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ expandedSidebar, setExpandedSidebar }: navbarProps) => {
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={combineClasses(
        styles.navbar,
        expandedSidebar && styles.expandedSidebar
      )}
    >
      <div className={styles.logoAndHamburger}>
        {window.innerWidth < 1024 ? (
          <img className={styles.smallLogo} src={smallLogo} alt="logo" />
        ) : (
          <img src={Logo} alt="logo" />
        )}

        <div
          onClick={() => {
            setExpandedSidebar(!expandedSidebar);
            console.log(expandedSidebar);
          }}
          className={combineClasses(
            styles.hamburger,
            expandedSidebar && styles.open
          )}
          id="hamburger"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <ul
        className={combineClasses(
          styles.navMenu,
          expandedSidebar && styles.expand
        )}
      >
        {MenuItems.map((item, index) => {
          return (
            <Link to={item.url} key={index}>
              <li className={styles.navLinksLi}>
                <i className={combineClasses(item.icon, styles.icon)}></i>
                <p className={styles.link}>{item.title}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
