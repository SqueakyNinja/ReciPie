import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useStore } from "../../store";

const Settings = () => {
  const { darkMode, setDarkMode } = useStore();

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            name="darkmode"
            color="primary"
          />
        }
        label="Activate Dark Mode"
      />
    </div>
  );
};

export default Settings;
