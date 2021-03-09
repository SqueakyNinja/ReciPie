import styles from "./MealCard.module.scss";

const RecipeDetails = ({ recipe }) => {
  return recipe.extendedIngredients ? (
    <div className={styles.container}>
      <img src={recipe.image}></img>

      <div className={styles.mealInfo}>
        <h2>{recipe.title}</h2>
        {recipe.sourceName && <p>{recipe.sourceName}</p>}
        <i className="far fa-heart"></i>
        <i className="fas fa-heart"></i>
        {recipe.servings > 0 && <p>Servings: {recipe.servings}</p>}
        {recipe.aggregateLikes && <p>{recipe.aggregateLikes} likes</p>}
        {recipe.readyInMinutes > 0 && (
          <p>Prep time: {recipe.readyInMinutes} min</p>
        )}
      </div>

      <div className={styles.ingredients}>
        <h3>Ingredients:</h3>
        <div>
          <ul>
            {recipe &&
              recipe.extendedIngredients.map((i, index) => (
                <li key={index}>
                  {i.measures.metric.amount > 0 && (
                    <span>
                      {i.measures.metric.amount}
                      {i.measures.metric.unitShort}
                    </span>
                  )}
                  {i.name.length > 0 && <span>{i.name}</span>}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className={styles.instructions}>
        <h3>Instructions: </h3>
        <div>
          <ol>
            {recipe &&
              recipe.analyzedInstructions[0].steps.map((obj) => (
                <li key={obj.number}>
                  <span>
                    {obj.number}. {obj.step}
                  </span>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RecipeDetails;
