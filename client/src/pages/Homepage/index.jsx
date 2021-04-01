import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import Search from '../../components/Search/Search';
import { useStore } from '../../store';
import { useHistory } from 'react-router-dom';
import MealGrid from '../../components/MealGrid/MealGrid';

const Homepage = () => {
  const apiKey = '8080ada856dd4f439b4a065ae353d836';
  const [recipesOfTheDay, setRecipesOfTheDay] = useState([]);
  const { query, setQuery } = useStore();
  const history = useHistory();
  let url1;
  let url2;
  let day;
  switch (new Date().getDay()) {
    case 0:
      //söndag//
      url1 = 'cuisine';
      url2 = 'italian';
      day = 'Sunday';
      break;

    case 1:
      //måndag//
      url1 = 'cuisine';
      url2 = 'nordic';
      day = 'Monday';
      break;
    case 2:
      //tisdag//
      url1 = 'includeIngredients';
      url2 = 'fish';
      day = 'Tuesday';
      break;
    case 3:
      //onsdag//
      url1 = 'type';
      url2 = 'salad';
      day = 'Wednesday';
      break;
    case 4:
      url1 = 'type';
      url2 = 'soup';
      day = 'Thursday';
      break;
    case 5:
      url1 = 'cuisine';
      url2 = 'mexican';
      day = 'Friday';
      break;
    case 6:
      url1 = 'cuisine';
      url2 = 'nordic';
      day = 'Saturday';
      break;
    default:
      url1 = '';
      url2 = '';
      day = '';
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchRecipe = async () => {
    const result = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?${url1}=${url2}&number=8&apiKey=${apiKey}`
    );
    setRecipesOfTheDay(result.data.results);
  };

  useEffect(() => {
    setQuery('');
    fetchRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const timeoutVar = setTimeout(() => {
        history.push('/browse-recipe');
      }, 750);
      return () => clearTimeout(timeoutVar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={styles.containerHomepage}>
      <Paper elevation={3}>
        <div className={styles.whatToDo}>
          <Search />
        </div>
        <div className={styles.homePagePaper}>
          <h3> Happy {day}!</h3>
          <h3> Tip of the day: {capitalizeFirstLetter(url2)}</h3>
          <div className={styles.mealOftheDay}>
            <MealGrid recipes={recipesOfTheDay} />
            {/* <div className={styles.homePageRight}>
              <h1>
                /* Today is {day}! <br></br>On {day}s we eat {recipe.title}
              </h1>
            </div>

            <div className={styles.homePageLeft}>
               <img src={recipe.image} alt={'Meal'} /> 
            </div>*/}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Homepage;
