import MealItem from "./MealItem";
import Grid from "@material-ui/core/Grid";
import styles from "./MealGrid.module.scss";


const MealGrid = ({ recipes }) => {
  return (
    <div>
      <Grid container className={styles.grid} spacing={2}>
        <MealItem recipes={recipes} />
      </Grid>

    </div>
  );
};

export default MealGrid;
