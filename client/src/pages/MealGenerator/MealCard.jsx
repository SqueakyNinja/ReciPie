import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { useStore } from '../../store';
import { saveFavouriteRecipe } from '../../api/recipes';
import styles from './MealCard.module.scss';
import { textEllipsis } from '../../utils';

const MealCard = ({ meal }) => {
  const history = useHistory();
  const { setSnackbar, currentUser } = useStore();

  const handleClick = () => {
    history.push(`/meal-card/${meal.id}`);
  };

  const handleSave = async () => {
    try {
      await saveFavouriteRecipe(currentUser.id, null, meal.id);
      setSnackbar('Successfully added recipe to My Recipes', 'success');
    } catch (error) {
      console.log(error);
      setSnackbar(
        'Something went wrong, please contact site administrator',
        'error'
      );
    }
  };

  return (
    <div key={meal.id} className={styles.MealCard}>
      <Card elevation={3} className={styles.card} onClick={handleClick}>
        <CardContent className={styles.content}>
          <img src={meal.image} alt={meal.description} />
          <h2>{textEllipsis(meal.title, 40)}</h2>
        </CardContent>

        <CardActions className={styles.actions}>
          {/* <Button size='small'>Yum pick me!</Button> */}

          <Button className={styles.save} onClick={handleSave}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MealCard;
