import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import Form from "./pages/Signup/Form";
import Style from "./pages/Style";
import { Dispatch, SetStateAction } from "react";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";
interface DarkMode {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}
const Main = ({ darkMode, setDarkMode }: DarkMode) => {
  return (
    <Paper className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route path="/scan" component={AddOCRRecipe} />
      <Route exact path="/signup" component={Form} />
      <Route exact path="/style" component={Style} />
      <Route path="/settings">
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
      </Route>
    </Paper>
  );
};

export default Main;
