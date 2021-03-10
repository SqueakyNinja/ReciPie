import CreateRecipe from "./pages/CreateRecipe";
import Style from "./pages/Style";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";
import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import MealGenerator from "./pages/MealGenerator";
import MealCard from "./pages/MealGenerator/MealCard";
import Account from "./pages/Account";

const Main = () => {
  return (
    <Paper className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route path="/scan" component={AddOCRRecipe} />
      <Route exact path="/account/signup" component={Account} />
      <Route exact path="/account/login" component={Account} />
      <Route exact path="/style" component={Style} />
      <Route exact path="/recipe" component={CreateRecipe} />
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/meal-generator">
        <MealGenerator />
      </Route>
      <Route path="/meal-card/:id">
        <MealCard />
      </Route>
    </Paper>
  );
};

export default Main;
