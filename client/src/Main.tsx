import { Route } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";
import Homepage from "./pages/Homepage";
import styles from "./app.module.scss";
import Form from "./pages/Signup/Form";
import Style from "./pages/Style";

const Main = () => {
  return (
    <div className={styles.mainArea}>
      <Route exact path="/" component={Homepage} />
      <Route path="/scan" component={AddOCRRecipe} />
      <Route exact path="/signup" component={Form} />
      <Route exact path="/style" component={Style} />
    </div>
  );
};

export default Main;
