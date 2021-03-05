import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RecipeDetails from "./RecipeDetails";

const MealCard = () => {
  const recipeId = useParams().id;
  const apiKey = "8080ada856dd4f439b4a065ae353d836";
  const [ingredients, setIngredients] = useState({});
  const [instructions, setInstructions] = useState({});
  const [image, setImage] = useState("");
  const [recipe, setRecipe] = useState({ingredients, instructions, image });

  const fetchIngredients = async () => {
    const result = await axios(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
    );

    setIngredients(result.data);
    setImage(result.data.image);
    console.log(result.data)
  };

  const fetchInstructions = async () => {
    const result = await axios(
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`
    );
    setInstructions(result.data);
  };

  useEffect(() => {
    fetchIngredients();
    fetchInstructions();

  }, []);
  
  useEffect(() => {
    setRecipe({ ingredients, instructions, image });
  }, [ingredients, image, instructions])

  return (
    <div>
      <RecipeDetails recipe={recipe} />
     
    </div>

    /* <div className={styles.container}>
      <img src={ingredients.image}></img>

      <div className={styles.mealInfo}>
        <h2>{ingredients.title}</h2>
        <p>{ingredients.sourceName}</p>
        <i className="far fa-heart"></i>
        <i className="fas fa-heart"></i>
        <p>{ingredients.aggregateLikes} likes</p>
        <p>Prep time: {ingredients.readyInMinutes} min</p>
      </div>

      <div className={styles.ingredients}>
        <h3>Ingredients:</h3>
        <div>
          <ul>
            {ingredients &&
              ingredients.extendedIngredients.map((i) => (
                <li
                  key={i.id}
                >{`${i.measures.metric.amount} ${i.measures.metric.unitShort} ${i.name}`}</li>
              ))}
          </ul>
        </div>
      </div>

      <div className={styles.instructions}>
        <h3>Instructions: </h3>
        <div>
          <ol>
            {instructions &&
              instructions[0].steps.map((obj) => (
                <li key={obj.number}>{obj.step}</li>
              ))}
          </ol>
        </div>
      </div>
    </div> */
  );
};

export default MealCard;
