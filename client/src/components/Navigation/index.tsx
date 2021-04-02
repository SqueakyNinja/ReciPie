import React, { useEffect, useRef, useState } from "react";
import { MenuItems } from "./MenuItems";
import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import { useHistory } from "react-router-dom";
import SubItems from "./SubItems";
import { Button, InputAdornment, TextField, ClickAwayListener } from "@material-ui/core";
import { useStore } from "../../store";
import AccountMenu from "./AccountMenu";

type ViewType = "desktop" | "mobile";

const Navbar = () => {
  const ref = useRef<HTMLUListElement>(null);
  const currentView = useRef<ViewType>(window.innerWidth >= 1024 ? "desktop" : "mobile");
  const { expandedSidebar, setExpandedSidebar, currentUser, height, setHeight } = useStore();
  const [expandNoTransitions, setExpandNoTransitions] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024 && currentView.current === "desktop") {
        currentView.current = width >= 1024 ? "desktop" : "mobile";
        setExpandedSidebar(false);
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        setHeight(0);
      }

      if (width >= 1024 && currentView.current === "mobile") {
        currentView.current = width >= 1024 ? "desktop" : "mobile";
        expandedSidebar && setExpandedSidebar(false);
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        ref.current && setHeight(ref.current.scrollHeight);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    const expandedSidebarNewState = !expandedSidebar;
    setExpandedSidebar(expandedSidebarNewState);
    if (ref.current) {
      expandedSidebarNewState ? setHeight(ref.current.scrollHeight) : setHeight(0);
    }
  };

  const handleClickAway = () => {
    setTimeout(() => {
      if (window.innerWidth < 1024) {
        expandedSidebar && setExpandedSidebar(false);
        setHeight(0);
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
              onClick={() => history.push("/")}
            />
          ) : (
            <img src={"/images/ReciPie-light-logo.png"} alt="logo" onClick={() => history.push("/")} />
          )}

          <div
            onClick={handleClick}
            className={combineClasses(styles.hamburger, expandedSidebar && styles.open)}
            id="hamburger"
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <ul
          className={combineClasses(styles.navMenu, expandNoTransitions && styles.expandedNoSidebar)}
          style={{ maxHeight: `${height}px` }}
          ref={ref}
        >
          {currentView.current === "mobile" ? (
            <li className={styles.searchbarMobile}>
              {currentUser.id.length === 0 ? (
                <div className={styles.buttonDiv}>
                  <Button variant="outlined" className={styles.button} onClick={HandleSignupClick}>
                    Sign Up
                  </Button>
                  <Button variant="outlined" className={styles.button} onClick={HandleLoginClick}>
                    Login
                  </Button>
                </div>
              ) : (
                <AccountMenu />
              )}
            </li>
          ) : (
            ""
          )}
          {MenuItems.map((item, index) => {
            return (
              <SubItems
                key={index}
                item={item}
                handleClickAway={handleClickAway}
                dropdownRef={ref}
                setHeight={setHeight}
              />
            );
          })}
        </ul>
      </nav>
    </ClickAwayListener>
  );
};

export default Navbar;
