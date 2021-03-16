import styles from "../index.module.scss";
import { RecipeStepProps } from "../types";
import { TextField, Button } from "@material-ui/core";
import { validateRecipe} from "./validateRecipe"
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useStore } from "../../../store";


interface Values {
  title: string;
  servings: number;
  readyInMinutes: number;

}

const Step1 = ({ recipe, setRecipe, setExpanded, errors, setErrors }: RecipeStepProps) => {
  const {setSnackbar} = useStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    values.current={
      ...values.current, [name]: value
    }

    setErrors(validateRecipe(values.current));
  
  };


  const values = useRef<Values>({
    title: "",
    servings: 0,
    readyInMinutes: 0,
   
  });

  const handleNext = () => {
    Object.keys(errors).length === 0 && values.current.title ? setExpanded("panel2") :
    setSnackbar("Please fill the required fields", "error")
  }

  

  return (
    <div className={styles.step1}>
      <TextField variant="outlined" label="Name of Recipe" name="title" onChange={handleChange}/>
      {errors.title &&<p>{errors.title}</p>}
      <br />
      <br />
      <TextField variant="outlined" label="Number of portions" type="number" name="servings" onChange={handleChange}/>
      {errors.servings &&<p>{errors.servings}</p>}
      <br />
      <br />

      <TextField
        variant="outlined"
        label="Estimated time (minutes)"
        type="number"
        name="readyInMinutes"
        onChange={handleChange}
      />
      {errors.readyInMinutes && <p>{errors.readyInMinutes}</p>}
      <br />

      <Button
        color="primary"
        variant="contained"
        className={styles.secondaryButton}
        onClick={handleNext}
      >

        Next
      </Button>
     
    </div>
  );
};

export default Step1;
