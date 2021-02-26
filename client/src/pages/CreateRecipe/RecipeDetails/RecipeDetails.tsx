import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ActionYoutubeSearchedFor } from 'material-ui/svg-icons';
import { RecipeProps } from '../types';

const RecipeDetails = ({ recipe, setRecipe }: RecipeProps) => {
  return (
    <div>
      <h2>Recipe Details</h2>
      <div>
        <h3>{recipe.title}</h3>
        <p>Number of portions: {recipe.title}</p>
        <p>Cooking time (in minutes): {recipe.title}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
