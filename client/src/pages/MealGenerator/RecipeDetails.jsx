import styles from "./MealCard.module.scss";
import {useEffect, useState } from "react"

const RecipeDetails = ({ recipe }) => { 
  console.log(recipe.ingredients.extendedIngredients)
  
  return (

   recipe.instructions.length > 0 && recipe.ingredients.extendedIngredients.length > 0 ?
    <div className={styles.container}>
      <img src={recipe.image}></img>

      <div className={styles.mealInfo}>
        <h2>{recipe.ingredients.title}</h2>
        <p>{recipe.ingredients.sourceName}</p>
        <i className="far fa-heart"></i>
        <i className="fas fa-heart"></i>
        <p>{recipe.ingredients.aggregateLikes} likes</p>
        <p>Prep time: {recipe.ingredients.readyInMinutes} min</p>
      </div>

      <div className={styles.ingredients}>
        <h3>Ingredients:</h3>
        <div>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.extendedIngredients.map((i) => (
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
            {recipe.instructions &&
              recipe.instructions[0].steps.map((obj) => (
                <li key={obj.number}>{obj.step}</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  : ""
  );
};

export default RecipeDetails;
