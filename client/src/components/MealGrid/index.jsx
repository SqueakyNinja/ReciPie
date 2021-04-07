import Grid from "@material-ui/core/Grid";
import styles from "./MealGrid.module.scss";
import MealCard from "../MealCard";

const MealGrid = ({ recipes }) => {
  return (
    <div>
      <Grid container className={styles.grid}>
        {recipes.map((meal, index) => {
          return <MealCard meal={meal} key={index} />;
        })}
      </Grid>
    </div>
  );
};

export default MealGrid;
