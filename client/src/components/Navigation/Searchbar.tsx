import styles from "./Searchbar.module.scss";
import { TextField, InputAdornment } from "@material-ui/core";

const Searchbar = () => (
  <div className={styles.search}>
    <TextField
      placeholder="Search…"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <i className="fas fa-search"></i>
          </InputAdornment>
        ),
      }}
    />
  </div>
);

export default Searchbar;
