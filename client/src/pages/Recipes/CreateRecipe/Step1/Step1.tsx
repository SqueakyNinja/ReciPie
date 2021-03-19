import styles from "../index.module.scss";
import { FileWithPreview, RecipeStepOneProps } from "../types";
import { TextField, Button } from "@material-ui/core";
import { validateRecipe } from "./validateRecipe";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useStore } from "../../../../store";
import ImageDrop from "../../../../components/ImageDrop";

interface Values {
  title: string;
  servings: number;
  readyInMinutes: number;
}

const Step1 = ({ recipe, setRecipe, setExpanded, errors, setErrors, files, setFiles }: RecipeStepOneProps) => {
  const { setSnackbar } = useStore();
  const values = useRef<Values>({
    title: "",
    servings: 0,
    readyInMinutes: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
    values.current = {
      ...values.current,
      [name]: value,
    };

    setErrors(validateRecipe(values.current));
  };

  useEffect(() => {
    if (files.length > 0) {
      setRecipe({ ...recipe, image: files[0].preview });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const handleNext = () => {
    Object.keys(errors).length === 0 && values.current.title
      ? setExpanded("panel2")
      : setSnackbar("Please fill the required fields", "error");
  };

  const handleCallback = (dataFromChild: any) => {
    setFiles(
      dataFromChild.map((file: FileWithPreview) => {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      })
    );
  };

  return (
    <div className={styles.steps}>
      <div className={styles.Step1}>
        <TextField
          className={`${styles.recipeName} ${styles.textfield}`}
          variant="outlined"
          label="Name of Recipe"
          name="title"
          onChange={handleChange}
        />
        {errors.title && <p>{errors.title}</p>}
        <TextField
          className={`${styles.recipeServings} ${styles.textfield}`}
          variant="outlined"
          label="Number of portions"
          type="number"
          name="servings"
          onChange={handleChange}
        />
        {errors.servings && <p>{errors.servings}</p>}

        <TextField
          className={`${styles.recipeTime} ${styles.textfield}`}
          variant="outlined"
          label="Estimated time (minutes)"
          type="number"
          name="readyInMinutes"
          onChange={handleChange}
        />
        {errors.readyInMinutes && <p>{errors.readyInMinutes}</p>}

        <ImageDrop parentCallback={handleCallback} />

        <Button
          className={`${styles.secondaryButton} ${styles.nextButton}`}
          color="primary"
          variant="contained"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step1;
