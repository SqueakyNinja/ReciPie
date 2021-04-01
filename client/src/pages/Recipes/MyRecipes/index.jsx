import { useEffect, useState } from "react";
import { getAllRecipes } from "../../../api/recipes";
import MealGrid from "../../../components/MealGrid/MealGrid";
import { useStore } from "../../../store";
import styles from "./index.module.scss";
import { Paper } from "@material-ui/core";

const MyRecipes = () => {
  const { currentUser } = useStore();
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const myData = await getAllRecipes(currentUser.id);
        setMyRecipes(myData.recipes);
        const savedData = await getAllRecipes(currentUser.id, true);
        setSavedRecipes(savedData.recipes);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={styles.myRecipesContainer}>
      <div>
        <h2>Created Recipes</h2>
        {myRecipes.length > 0 ? <MealGrid recipes={myRecipes} /> : <p>You have not created any recipes yet...</p>}
      </div>
      <div>
        <h2 className={styles.h2}>Saved Recipes</h2>
        <MealGrid recipes={savedRecipes} />
      </div>
    </Paper>
  );
};

export default MyRecipes;
