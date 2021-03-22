import { Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import Style from "./pages/Style";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";
import MealGenerator from "./pages/MealGenerator";
import MealCard from "./pages/MealGenerator/MealCard";
import Account from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import CreateRecipe from "./pages/Recipes/CreateRecipe";
import MyRecipes from "./pages/Recipes/MyRecipes";
import ScanRecipe from "./pages/Recipes/ScanRecipe";
import ImageDrop from "./components/ImageDrop";
import BrowseRecipe from "./pages/BrowseRecipe"

const Main = () => {
  return (
    <Paper className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/scan" component={ScanRecipe} />
      <Route exact path="/account/signup" component={Account} />
      <Route exact path="/account/login" component={Account} />
      <Route exact path="/style" component={Style} />
      <Route exact path="/recipes/add" component={CreateRecipe} />
      <Route exact path="/recipes/my-recipes" component={MyRecipes} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/meal-generator" component={MealGenerator} />
      <Route exact path="/meal-card/:id" component={MealCard} />
      <Route exact path="/image" component={ImageDrop} />
      <Route exact path="/browse-recipe" component={BrowseRecipe}/>
    </Paper>
  );
};

export default Main;
