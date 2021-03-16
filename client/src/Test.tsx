import response from "./response.json";

const Test = () => {
  let data: any = response.recipes[0];
  let dishTypes: any = response.recipes[0].dishTypes;
  let ingredients: any = response.recipes[0].extendedIngredients.map(
    (x) => x.name
  );
  console.log(data);
  console.log(dishTypes);
  console.log(ingredients);
  return <div></div>;
};

export default Test;
