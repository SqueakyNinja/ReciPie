import styles from './index.module.scss';

const RecipeDetails = ({ recipe }) => {
  return recipe.extendedIngredients ? (
    <div className={styles.container}>
      <img src={recipe.image} className={styles.img}></img>

      <div className={styles.mealInfo}>
        <h2>{recipe.title}</h2>
        {recipe.sourceName && (
          <p className={styles.recipeName}>{recipe.sourceName}</p>
        )}
        <div className={styles.icon}>
          <i className='far fa-heart'></i>
          <i className='fas fa-heart'></i>
        </div>
        <div className={styles.shortInfo}>
          {recipe.servings > 0 && <p>Servings: {recipe.servings}</p>}
          {recipe.aggregateLikes && <p>{recipe.aggregateLikes} likes</p>}
          {recipe.readyInMinutes > 0 && (
            <p>Prep time: {recipe.readyInMinutes} min</p>
          )}
        </div>
      </div>

      <div className={styles.ingredients}>
        <h3>Ingredients:</h3>
        <div>
          <ul>
            {recipe.extendedIngredients.map((i, index) => (
              <li key={index}>
                {i.measures.metric.amount > 0 && (
                  <span>
                    {`
                   ${i.measures.metric.amount} 
                    ${i.measures.metric.unitShort} `}
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
    </div>
  ) : (
    <></>
  );
};

export default RecipeDetails;