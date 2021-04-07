import styles from "./RecipeDetails.module.scss";

const RecipeDetails = ({ recipe }) => {
  return recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
    <div className={styles.container}>
      {recipe.image.length > 0 && <img src={recipe.image} alt={"Meal"} className={styles.img}></img>}

      <div className={styles.mealInfo}>
        <h2>{recipe.title}</h2>
        {recipe.sourceName && <p className={styles.recipeName}>Made by: {recipe.sourceName}</p>}

        <div className={styles.shortInfo}>
          {recipe.servings > 0 && <p>Servings: {recipe.servings}</p>}
          {recipe.aggregateLikes && <p>{recipe.aggregateLikes} likes</p>}
          {recipe.readyInMinutes > 0 && <p>Prep time: {recipe.readyInMinutes} min</p>}
        </div>
      </div>
      <div>
        {recipe.extendedIngredients[0].name.length > 0 && (
          <div className={styles.ingredients}>
            <h3>Ingredients:</h3>
            <div>
              <ul>
                {recipe.extendedIngredients.map((i, index) => (
                  <li key={index}>
                    {i.measures.metric.amount > 0 && (
                      <span>
                        {`
                   ${Math.ceil(i.measures.metric.amount)} 
                    ${i.measures.metric.unitShort} `}
                      </span>
                    )}
                    {i.name.length > 0 && <span>{i.name}</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        {recipe.analyzedInstructions.length > 0 ? (
          recipe.analyzedInstructions[0].steps.length > 0 &&
          recipe.analyzedInstructions[0].steps[0].step && (
            <div className={styles.instructions}>
              <h3>Instructions: </h3>
              <div>
                <ol>
                  {recipe.analyzedInstructions[0].steps.map(
                    (obj) =>
                      obj.step.length > 0 && (
                        <li key={obj.number}>
                          <span>
                            {obj.number}. {obj.step}
                          </span>
                        </li>
                      )
                  )}
                </ol>
              </div>
            </div>
          )
        ) : (
          <div>Mix everything together. Eat. Enjoy!</div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RecipeDetails;
