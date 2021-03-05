import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const MealItem = ({ recipes }) => {
  const history = useHistory()


  return (
   recipes.map((meal) => {
        const handleClick = () => {
          history.push(`/meal-card/${meal.id}`)
        }
        return (
        <div key={meal.id}>
          <Card className="mealCard">
            <CardContent>
              <img src={meal.image} alt={meal.description} />
              <h2>{meal.title}</h2>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClick}>Yum pick me!</Button>
            </CardActions>
          </Card>
        </div>
      )}
   ))
};

export default MealItem;

