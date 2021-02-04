import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Hej!!</div>{" "}
        </Route>
        <Route path="/add-new-ocr-recipe">
          <AddOCRRecipe />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
