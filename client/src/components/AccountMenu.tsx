import { IconButton, MenuItem, Menu } from "@material-ui/core";
import React, { MouseEvent, useState } from "react";
import { useStore } from "../store";
import styles from "./index.module.scss";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setCurrentUser, setSnackbar } = useStore();
  const handleAccountClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setCurrentUser("");
    setSnackbar("Logout successful", "success");
  };
  return (
    <>
      <IconButton
        className={styles.account}
        id="accountButton"
        onClick={handleAccountClick}
      >
        <i className="far fa-user"></i>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={styles.accountMenu}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
