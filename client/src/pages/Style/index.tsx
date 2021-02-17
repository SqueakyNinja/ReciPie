import { Button, TextField } from "@material-ui/core";
import styles from "./index.module.scss";

const Style = () => {
  return (
    <div>
      <Button variant="contained" className={styles.button}>
        Button
      </Button>
      <Button variant="contained" color="secondary" className={styles.button}>
        Button
      </Button>
      <button className={styles.button}>Button</button>
      <TextField></TextField>
    </div>
  );
};
export default Style;
