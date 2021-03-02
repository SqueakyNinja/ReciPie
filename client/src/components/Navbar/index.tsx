import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import { useStore } from "../../store";

const LinkBehaviorSignup = forwardRef((props, ref) => (
  <RouterLink to="/account/signup" {...props} />
));
const LinkBehaviorLogin = forwardRef((props, ref) => (
  <RouterLink to="/account/login" {...props} />
));

interface Height {
  height: string;
}

type ViewType = "desktop" | "mobile";

const Navbar = () => {
  const currentView = useRef<ViewType>(
    window.innerWidth >= 1024 ? "desktop" : "mobile"
  );

  const [height, setHeight] = useState<Height>({ height: "0px" });
  const { darkMode, setDarkMode, currentUser } = useStore();
  const { expandedSidebar, setExpandedSidebar } = useStore();
  const [expandNoTransitions, setExpandNoTransitions] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 1024 && currentView.current === "desktop") {
        currentView.current = width >= 1024 ? "desktop" : "mobile";
        console.log("desktop to mobile");
        setExpandedSidebar(false);
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        setHeight({ height: "0px" });
      }

      if (width >= 1024 && currentView.current === "mobile") {
        currentView.current = width >= 1024 ? "desktop" : "mobile";
        console.log("mobile to desktop");
        expandedSidebar && setExpandedSidebar(false);
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        ref.current && setHeight({ height: `${ref.current.scrollHeight}px` });
      }
    }

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    console.log(currentUser);

    setExpandedSidebar(!expandedSidebar);
    if (ref.current) {
      expandedSidebar
        ? setHeight({ height: "0px" })
        : setHeight({ height: `${ref.current.scrollHeight}px` });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndHamburger}>
        {window.innerWidth < 1024 ? (
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
          onClick={handleClick}
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
          expandNoTransitions && styles.expandedNoSidebar
        )}
        style={height}
        ref={ref}
      >
        {currentView.current === "mobile" ? (
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
            {currentUser.length === 0 ? (
              <div className={styles.buttonDiv}>
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
              </div>
            ) : (
              <IconButton className={styles.account}>
                <i className="far fa-user"></i>
              </IconButton>
            )}
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
