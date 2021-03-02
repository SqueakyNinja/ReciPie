import React, { forwardRef, useEffect, useRef, useState } from "react";
import { MenuItems } from "./MenuItems";
import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ClickAwayListener,
} from "@material-ui/core";
import { useStore } from "../../store";

interface Height {
  height: string;
}

type ViewType = "desktop" | "mobile";

const Navbar = () => {
  const ref = useRef<HTMLUListElement>(null);
  const currentView = useRef<ViewType>(
    window.innerWidth >= 1024 ? "desktop" : "mobile"
  );

  const [height, setHeight] = useState<Height>(
    currentView.current === "desktop"
      ? ref.current
        ? { height: `${ref.current.scrollHeight}px` }
        : { height: "450px" }
      : { height: "0px" }
  );
  const { darkMode, setDarkMode, currentUser } = useStore();
  const { expandedSidebar, setExpandedSidebar } = useStore();
  const [expandNoTransitions, setExpandNoTransitions] = useState(false);
  const history = useHistory();

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
    console.log(ref);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    setExpandedSidebar(!expandedSidebar);
    if (ref.current) {
      expandedSidebar
        ? setHeight({ height: "0px" })
        : setHeight({ height: `${ref.current.scrollHeight}px` });
    }
  };

  const handleClickAway = () => {
    setTimeout(() => {
      if (window.innerWidth < 1024) {
        expandedSidebar && setExpandedSidebar(false);
        setHeight({ height: "0px" });
      }
    }, 0);
  };

  const HandleSignupClick = () => {
    handleClickAway();
    history.push("/account/signup");
  };
  const HandleLoginClick = () => {
    handleClickAway();
    history.push("/account/login");
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
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
                    onClick={HandleSignupClick}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outlined"
                    className={styles.button}
                    onClick={HandleLoginClick}
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
              <Link to={item.url} key={index} onClick={handleClickAway}>
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
    </ClickAwayListener>
  );
};

export default Navbar;
