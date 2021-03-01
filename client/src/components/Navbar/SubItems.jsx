import React, { useState } from "react";

import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import index from "./index";
import { Link } from "react-router-dom";

const SubItems = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <Link to={item.url} key={index} onClick={item.subNav && showSubnav}>
        <li className={styles.navLinksLi}>
          <span>
            <i className={combineClasses(item.icon, styles.icon)}></i>
          </span>
          <p className={styles.link}>{item.title}</p>
        </li>
      </Link>
      {subnav &&
        item.subNav &&
        item.subNav.map((item, index) => {
          return (
            <>
              <Link to={item.path} key={index}>
                <li className={styles.subLinks}>
                  <span>
                    <i className={combineClasses(item.icon, styles.icon)}></i>
                  </span>
                  <p className={styles.link}>{item.title}</p>
                </li>
              </Link>
            </>
          );
        })}
    </>
  );
};
export default SubItems;
