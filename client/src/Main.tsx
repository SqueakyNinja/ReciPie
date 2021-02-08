import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";

const Main = () => {
  return (
    <div className={styles.mainArea}>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/scan">
        <AddOCRRecipe />
      </Route>
    </div>
  );
};

export default Main;
