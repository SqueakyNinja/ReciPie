import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";

const Style = () => {
  return (
    <div>
      <Button variant="contained" className={styles.secondaryButton}>
        Button
      </Button>
      <Button variant="contained" className={styles.button}>
        Button
      </Button>
      <button className={styles.button}>Button</button>
      <TextField variant="outlined"></TextField>
    </div>
  );
};
export default Style;
