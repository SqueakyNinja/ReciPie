import { Route } from 'react-router-dom';
import AddOCRRecipe from './pages/AddOCRRecipe';
import Homepage from './pages/Homepage';
import styles from './app.module.scss';
import CreateRecipe from './pages/CreateRecipe';
import Form from './pages/Signup/Form';

const Main = () => {
  return (
    <div className={styles.mainArea}>
      <Route exact path='/'>
        <Homepage />
      </Route>
      <Route path='/scan'>
        <AddOCRRecipe />
      </Route>
      <Route path='/recipe'>
        <CreateRecipe />
      </Route>
      <Route exact path='/signup'>
        <Form />
      </Route>
    </div>
  );
};

export default Main;
