import MealItem from "./MealItem";
import Grid from "@material-ui/core/Grid";
import styles from "./MealGrid.module.scss";

const MealGrid = ({ recipes }) => {
  return (
    <div>
      <Grid container className={styles.grid} spacing={2}>
        {recipes.map((meal, index) => {
          return <MealItem meal={meal} key={index} />;
        })}
      </Grid>
    </div>
  );
};

export default MealGrid;
