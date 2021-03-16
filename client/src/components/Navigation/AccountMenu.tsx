import { IconButton, MenuItem, Menu } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import { useStore } from "../../store";
import styles from "./index.module.scss";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setCurrentUser, setSnackbar, expandedSidebar, setExpandedSidebar, setHeight } = useStore();
  const history = useHistory();

  const handleClickAway = () => {
    setTimeout(() => {
      if (window.innerWidth < 1024) {
        expandedSidebar && setExpandedSidebar(false);
        setHeight(0);
      }
    }, 0);
  };

  const handleAccountClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const profileClick = () => {
    history.push("/profile");
    handleClickAway();
    setAnchorEl(null);
  };

  const logoutClick = () => {
    setCurrentUser({ username: "", id: "" });
    setSnackbar("Logout successful", "success");
    handleClickAway();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.account}>
      <IconButton className={styles.account} id="accountButton" onClick={handleAccountClick}>
        <i className="far fa-user"></i>
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={profileClick}>My profile</MenuItem>
        <MenuItem onClick={logoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;
