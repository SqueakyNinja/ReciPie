import React, {
  createRef,
  forwardRef,
  useEffect,
  useRef,
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
import { useStore } from "../../store";

const LinkBehavior = forwardRef((props, ref) => (
  <RouterLink to="/account/signup" {...props} />
));

interface Height {
  height: string;
}

const Navbar = () => {
  const currentView = useRef<"desktop" | "mobile">("desktop");
  const [height, setHeight] = useState<Height>({ height: "0px" });
  const { darkMode, setDarkMode } = useStore();
  const { expandedSidebar, setExpandedSidebar } = useStore();
  const [expandNoTransitions, setExpandNoTransitions] = useState(false);
  const ref = createRef<HTMLUListElement>();

  function handleResize() {
    setWidth(window.innerWidth);
    console.log(width);
  }

  useEffect(() => {
    const calcHeightOnResize = () => {
      if (window.innerWidth < 1024) {
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        !expandedSidebar && setHeight({ height: "0px" });
      }
      if (window.innerWidth >= 1024) {
        console.log("setting height for desktop");
        setExpandNoTransitions(true);
        setTimeout(() => {
          setExpandNoTransitions(false);
        }, 500);
        expandedSidebar && setExpandedSidebar(false);
        console.log(ref.current);
        ref.current && setHeight({ height: `${ref.current.scrollHeight}px` });
      }
    };
    calcHeightOnResize();

    if (width >= 1024 && currentView.current !== "desktop") {
      currentView.current = "desktop";
    }
    if (width < 1024 && currentView.current !== "mobile") {
      currentView.current = "mobile";
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

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

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoAndHamburger}>
        {currentView.current === "mobile" ? (
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
          expandNoTransitions && styles.expandedSidebar
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
