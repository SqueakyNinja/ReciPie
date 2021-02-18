import React, { useState, useEffect } from "react";
import "./app.global.scss";
import styles from "./app.module.scss";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";


import { combineClasses } from "./utils";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Navbar/Header";

const App = () => {
  //Ändra detta till useStore sen kanske?
  const [expandedSidebar, setExpandedSidebar] = useState<boolean>(false);
  

  return (
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
        />
        <Main />
      </Router>
    </div>
  );
};

export default App;
