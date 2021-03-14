import Style from "./pages/Style";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";
import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import MealGenerator from "./pages/MealGenerator";
import MealCard from "./pages/MealGenerator/MealCard";
import Account from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import CreateRecipe from "./pages/Recipes/CreateRecipe";

const Main = () => {
  return (
    <Paper className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route path="/scan" component={AddOCRRecipe} />
      <Route exact path="/account/signup" component={Account} />
      <Route exact path="/account/login" component={Account} />
      <Route exact path="/style" component={Style} />
      <Route exact path="/recipe/add" component={CreateRecipe} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/meal-generator" component={MealGenerator} />
      <Route exact path="/meal-card/:id" component={MealCard} />
    </Paper>
  );
};

export default Main;
