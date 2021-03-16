import CreateRecipe from "./pages/Recipe/CreateRecipe";
import Style from "./pages/Style";
import { Dispatch, SetStateAction } from "react";
import Settings from "./pages/Settings";
import { Paper } from "@material-ui/core";
import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import Form from "./pages/Signup/Form";
import MealGenerator from "./pages/MealGenerator";
import MealCard from "./pages/MealGenerator/MealCard";
import ImageDrop from "./components/ImageDrop/ImageDrop";

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
      <Route exact path="/recipe" component={CreateRecipe} />
      <Route exact path="/image" component={ImageDrop} />
      <Route path="/settings">
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
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
