import React, { Dispatch, SetStateAction } from "react";
import { FormControlLabel, Switch, Paper, Grid } from "@material-ui/core";

interface DarkMode {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
const Settings = ({ darkMode, setDarkMode }: DarkMode) => {
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
