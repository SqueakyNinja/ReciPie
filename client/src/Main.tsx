import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import Account from "./pages/Account";
import Style from "./pages/Style";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";

const Main = () => {
  return (
    <Paper className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route path="/scan" component={AddOCRRecipe} />
      <Route exact path="/account/signup" component={Account} />
      <Route exact path="/account/login" component={Account} />
      <Route exact path="/style" component={Style} />
      <Route path="/settings">
        <Settings />
      </Route>
    </Paper>
  );
};

export default Main;
