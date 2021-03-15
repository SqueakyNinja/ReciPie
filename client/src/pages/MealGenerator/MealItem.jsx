import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { saveFavouriteRecipe } from "../../api/recipes";
import axios from "axios";
import { useStore } from "../../store";

const MealItem = ({ meal }) => {
  const history = useHistory();
  const { setSnackbar, currentUser } = useStore();

  const handleClick = () => {
    history.push(`/meal-card/${meal.id}`);
  };

  const handleSave = async () => {
    try {
      const saveRecipe = await saveFavouriteRecipe(currentUser.id, null, meal.id);
      setSnackbar("Successfully added recipe to My Recipes", "success");
    } catch (error) {
      console.log(error);
      setSnackbar("Something went wrong, please contact site administrator", "error");
    }
  };

  return (
    <div key={meal.id}>
      <Card className="mealCard">
        <CardContent>
          <img src={meal.image} alt={meal.description} />
          <h2>{meal.title}</h2>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Yum pick me!
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MealItem;
