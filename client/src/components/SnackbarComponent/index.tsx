import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { useStore } from "../../store";

const SnackbarComponent = () => {
  const { snackbar, setSnackbar } = useStore();
  const { message, type } = snackbar;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={message !== ""}
      onClose={() => setSnackbar("", undefined)}
      autoHideDuration={4000}
    >
      <Alert variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
