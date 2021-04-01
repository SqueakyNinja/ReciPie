import React from "react";
import { Button } from "@material-ui/core";
import styles from "./MealCard.module.scss";

const SaveButton = ({ meal, currentUser, handleSave }) => {
  if (!meal.apiId && meal.sourceName !== currentUser.username) {
    return (
      <Button className={styles.save} onClick={handleSave}>
        Save
      </Button>
    );
  }

  return <></>;
};

export default SaveButton;
