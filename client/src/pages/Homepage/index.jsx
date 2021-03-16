import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";

const Homepage = () => {
  const apiKey = "8080ada856dd4f439b4a065ae353d836";
  const [recipe, setRecipe] = useState({});

  let url1;
  let url2;
  let day;
  switch (new Date().getDay()) {
    case 0:
      //söndag//
      url1 = "cuisine";
      url2 = "italian";
      day = "Sunday";
      break;

    case 1:
      //måndag//
      url1 = "cuisine";
      url2 = "nordic";
      day = "Monday";
      break;
    case 2:
      //tisdag//
      url1 = "includeIngredients";
      url2 = "fish";
      day = "Tuesday";
      break;
    case 3:
      //onsdag//
      url1 = "type";
      url2 = "salad";
      day = "wednesday";
      break;
    case 4:
      url1 = "type";
      url2 = "soup";
      day = "Thursday";
      break;
    case 5:
      url1 = "cuisine";
      url2 = "mexican";
      day = "Friday";
      break;
    case 6:
      url1 = "cuisine";
      url2 = "nordic";
      day = "Saturday";
      break;
    default:
      url1 = "";
      url2 = "";
      day = "";
  }

  const fetchRecipe = async () => {
    const result = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?${url1}=${url2}&number=1&apiKey=${apiKey}`
    );
    setRecipe(result.data.results[0]);

    console.log(result.data.results);
  };

  useEffect(() => {
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.containerHomepage}>
      <Paper className={styles.homePagePaper}>
        <div className={styles.homePageTitle}>
          <h1>Welcome to ReciPie!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veniam blanditiis officiis consequatur dolore
            excepturi, architecto magnam vel illo voluptatum ipsa nam ex ullam, pariatur alias iusto, quasi dicta ipsum!
          </p>
        </div>
      </Paper>
      <div className={styles.whatToDo}>
        <div className={styles.whatToDoBox}>
          Start your culinary journey today by sign up to search, create and share recipes!
        </div>
        <div className={styles.whatToDoBox}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta incidunt eaque sunt explicabo illum quidem
          consectetur quam nesciunt amet, voluptate quaerat debitis eum nisi cumque, impedit unde blanditiis perferendis
          nemo.
        </div>
        <div className={styles.whatToDoBox}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas voluptates architecto iure at laborum
          omnis? Illum, voluptatem eos? Neque consequatur sed adipisci ipsam beatae? Sapiente placeat architecto et
          eius?
        </div>
      </div>
      <Paper className={styles.homePagePaper}>
        <div className={styles.mealOftheDay}>
          <div className={styles.homePageRight}>
            <h1>
              Today is {day}! <br></br>On {day}s we eat {recipe.title}
            </h1>
          </div>

          <div className={styles.homePageLeft}>
            <img src={recipe.image} alt={"Meal"} />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Homepage;
