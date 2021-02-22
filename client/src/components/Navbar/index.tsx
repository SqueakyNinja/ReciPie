import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MenuItems } from "./MenuItems";
import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";

interface navbarProps {
  expandedSidebar: boolean;
  setExpandedSidebar: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink to="/signup" {...props} />
));

const Navbar = ({
  expandedSidebar,
  setExpandedSidebar,
  darkMode,
  setDarkMode,
}: navbarProps) => {
  const [width, setWidth] = useState<number>(450);

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
        {width < 1024 ? (
          <img
            className={styles.smallLogo}
            src={"/images/ReciPie-light-small-logo.png"}
            alt="logo"
          />
        ) : (
          <img src={"/images/ReciPie-light-logo.png"} alt="logo" />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              name="darkmode"
              color="primary"
            />
          }
          label="Dark Mode"
        />
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
        {window.innerWidth < 1024 ? (
          <li className={styles.searchbarMobile}>
            <div className={styles.search}>
              <TextField
                placeholder="Search…"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="fas fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              variant="outlined"
              className={styles.button}
              component={LinkBehavior}
            >
              Sign Up
            </Button>
            <IconButton className={styles.account}>
              <i className="far fa-user"></i>
            </IconButton>
          </li>
        ) : (
          ""
        )}
        {MenuItems.map((item, index) => {
          return (
            <Link to={item.url} key={index}>
              <li className={styles.navLinksLi}>
                <span>
                  <i className={combineClasses(item.icon, styles.icon)}></i>
                </span>
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
