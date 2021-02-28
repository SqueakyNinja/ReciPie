import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

interface SnackbarProps {
  message: string;
  type: string;
}

const SnackbarComponent = ({ message, type }: SnackbarProps) => {
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "success" | undefined
  >();
  const [snackbarMessage, setSnackbarMessage] = useState(" ");
  const [snackbarOpen, setSnackbarOpen] = useState(true);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      autoHideDuration={4000}
    >
      <Alert variant="filled" severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
