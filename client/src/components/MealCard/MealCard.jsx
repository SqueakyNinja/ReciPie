import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { IconButton, CardContent, CardActions, Card } from "@material-ui/core";
import { useStore } from "../../store";
import { checkFavourite, saveFavouriteRecipe } from "../../api/recipes";
import styles from "./MealCard.module.scss";
import { textEllipsis } from "../../utils";
import { useEffect, useState } from "react";

const MealCard = ({ meal }) => {
  const history = useHistory();
  const { setSnackbar, currentUser } = useStore();
  const [favouriteStatus, setFavouriteStatus] = useState(false);
  const [useEffectActivator, setUseEffectActivator] = useState(false);

  const handleClick = () => {
    history.push(`/recipe/${meal.id}`);
  };

  const handleSave = async () => {
    try {
      if (meal.id.length === 36) {
        await saveFavouriteRecipe(currentUser.id, meal.id, null);
        setUseEffectActivator(!useEffectActivator);
      } else {
        await saveFavouriteRecipe(currentUser.id, null, meal.id);
        setUseEffectActivator(!useEffectActivator);
      }
      setSnackbar("Successfully added recipe to My Recipes", "success");
    } catch (error) {
      console.log(error);
      setSnackbar("Something went wrong, please contact site administrator", "error");
    }
  };

  useEffect(() => {
    const status = async () => {
      if (meal.id.length === 36) {
        const favouriteStatus = await checkFavourite(currentUser.id, meal.id, "");
        setFavouriteStatus(favouriteStatus.status);
      } else {
        const favouriteStatus = await checkFavourite(currentUser.id, "", meal.id);
        setFavouriteStatus(favouriteStatus.status);
      }
    };
    status();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useEffectActivator]);

  return (
    <div key={meal.id} className={styles.MealCard}>
      <Card elevation={3} className={styles.card}>
        <CardContent className={styles.content} onClick={handleClick}>
          <img src={meal.image} alt={meal.description} />
          <h2>{textEllipsis(meal.title, 40)}</h2>
          <CardActions className={styles.actions}>
            <IconButton className={styles.favouriteIcon}>
              <i
                className={styles.save}
                onClick={handleSave}
                className={favouriteStatus ? "fas fa-heart" : "far fa-heart"}
              ></i>
            </IconButton>
          </CardActions>
        </CardContent>
        <Button className={styles.save} onClick={handleSave}></Button>
      </Card>
    </div>
  );
};

export default MealCard;
