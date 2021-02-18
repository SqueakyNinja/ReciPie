const MealItem = ({ recipes }) => {
  return recipes ?

  recipes.map((meal) => (
    <div>
      <img src={meal.image} alt={meal.description} />
      <h2>{meal.title}</h2>
    </div>
  ))

  : "";
  
};

export default MealItem;
