import React, { useState, useEffect, ChangeEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { ActionYoutubeSearchedFor } from 'material-ui/svg-icons';
import { RecipeProps } from '../types';

const RecipeDetails = ({ recipe, setRecipe }: RecipeProps) => {
  return (
    <div>
      <h3>Recipe Details</h3>
      <div>
        <p>Recipe Title</p>
        <p>Cooking time</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
