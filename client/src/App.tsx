import React, { useState } from "react";
import "./app.global.scss";
import styles from "./app.module.scss";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import { combineClasses } from "./utils";
import Navbar from "./components/Navbar";
import Header from "./components/Navbar/Header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey, green } from "@material-ui/core/colors";

const App = () => {
  //Ändra detta till useStore sen kanske?
  const [expandedSidebar, setExpandedSidebar] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // https://material-ui.com/customization/color/ för att se fler färger
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        light: green[300],
        main: green[400],
        dark: green[500],
        contrastText: "#fff",
      },
      secondary: {
        light: grey[200],
        main: grey[300],
        dark: grey[400],
        contrastText: "#000",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className={combineClasses(
          styles.container,
          expandedSidebar && styles.expandedSidebar
        )}
      >
        <Router>
          <Header />
          <Navbar
            expandedSidebar={expandedSidebar}
            setExpandedSidebar={setExpandedSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Main darkMode={darkMode} setDarkMode={setDarkMode} />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
