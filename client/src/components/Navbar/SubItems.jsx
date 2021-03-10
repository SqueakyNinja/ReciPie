import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import { combineClasses } from "../../utils";
import { Link } from "react-router-dom";

const SubItems = ({ item, handleClickAway, dropdownRef, setHeight }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnavHeight, setSubnavHeight] = useState(0);
  const submenuRef = useRef(null);

  const calcHeights = (newState) => {
    if (dropdownRef && submenuRef) {
      newState
        ? setSubnavHeight(submenuRef.current.scrollHeight)
        : setSubnavHeight(0);
      setHeight(
        dropdownRef.current.scrollHeight + submenuRef.current.scrollHeight
      );
    }
  };

  const handleClick = () => {
    if (item.subNav) {
      const newSubnavState = !subnav;
      setSubnav(newSubnavState);
      calcHeights(newSubnavState);
    } else if (!item.subnav) {
      handleClickAway();
    }
  };

  return (
    <>
      <Link to={item.url} onClick={handleClick}>
        <li className={styles.navLinksLi}>
          <span>
            <i className={combineClasses(item.icon, styles.icon)}></i>
          </span>
          <p className={styles.link}>{item.title}</p>
        </li>
      </Link>
      <div
        className={styles.submenu}
        ref={submenuRef}
        style={{ maxHeight: `${subnavHeight}px` }}
      >
        {item.subNav &&
          item.subNav.map((item, index) => {
            return (
              <Link to={item.path} key={index} onClick={handleClickAway}>
                <li className={styles.subLinks}>
                  <span>
                    <i className={combineClasses(item.icon, styles.icon)}></i>
                  </span>
                  <p className={styles.link}>{item.title}</p>
                </li>
              </Link>
            );
          })}
      </div>
    </>
  );
};
export default SubItems;
