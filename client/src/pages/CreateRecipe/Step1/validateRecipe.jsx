export function validateRecipe(values) {
  let errors = {} 
  if (!values.title) {
        errors.title = "Please name your recipe";
      } 
      if (!values.servings) {
        errors.servings = "Please specify the amount of servings";
      } 
      if (!values.readyInMinutes) {
        errors.readyInMinutes = "Please specify the time";
      } 
      return errors;
}