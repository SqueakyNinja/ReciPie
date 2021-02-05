import React from "react";
import './App.css'
import NavTop from "./components/Navbar/NavTop";
import Navbar from "./components/Navbar/Navbar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AddOCRRecipe from "./pages/AddOCRRecipe";

const App = () => {
  return (
    
    <Router>
      <div className="grid">
      <NavTop />
      <Navbar/>
    </div>
      <Switch>
        <Route exact path="/">
        <div>Hej!!{" "}</div>
        </Route>
        <Route path="/add-new-ocr-recipe">
          <AddOCRRecipe />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
