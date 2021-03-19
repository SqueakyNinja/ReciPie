import { useEffect, useRef, useState } from "react";
import { createWorker, createScheduler } from "tesseract.js";
import { Button, Modal, Backdrop, Fade, Paper, Typography, TextField } from "@material-ui/core";
import ImageDrop from "../../../components/ImageDrop";
import Loadingbar from "../../../components/Loadingbar";
import styles from "./index.module.scss";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";
import Cropping from "./Cropping";
import produce from "immer";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useStore } from "../../../store";

const ScanRecipe = ({ recipe, setRecipe, openUpload, setOpenUpload }) => {
  const { setSnackbar } = useStore();
  const [progress, setProgress] = useState(0);
  const [workerOneProgress, setWorkerOneProgress] = useState(0);
  const [workerTwoProgress, setWorkerTwoProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [trimText, setTrimText] = useState(false);
  const [imagesToProcess, setImagesToProcess] = useState(["", ""]);
  const [ingredientsFromImage, setIngredientsFromImage] = useState("");
  const [instructionsFromImage, setInstructionsFromImage] = useState("");
  const recipeRef = useRef(recipe);

  const scheduler = createScheduler();
  const workerOne = createWorker({
    logger: (m) => {
      if (m.status === "recognizing text") {
        setWorkerOneProgress(m.progress);
      }
    },
  });
  const workerTwo = createWorker({
    logger: (m) => {
      if (m.status === "recognizing text") {
        setWorkerTwoProgress(m.progress);
      }
    },
  });

  useEffect(() => {
    if (imagesToProcess[0] === "" || imagesToProcess[1] === "") {
      setProgress(workerOneProgress + workerTwoProgress);
      if (workerOneProgress + workerTwoProgress === 1) {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    } else {
      setProgress(workerOneProgress / 2 + workerTwoProgress / 2);
      if (workerOneProgress / 2 + workerTwoProgress / 2 === 1) {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workerOneProgress, workerTwoProgress]);

  const processRecipe = async () => {
    if (imagesToProcess[0] !== "" || imagesToProcess[1] !== "") {
      setLoading(true);
      await workerOne.load();
      await workerTwo.load();
      await workerOne.loadLanguage("eng");
      await workerTwo.loadLanguage("eng");
      await workerOne.initialize("eng");
      await workerTwo.initialize("eng");
      scheduler.addWorker(workerOne);
      scheduler.addWorker(workerTwo);
      const regex = /\r?\n|\r/g;

      // If both images will be processed
      if (imagesToProcess[0] !== "" && imagesToProcess[1] !== "") {
        const results = await Promise.all(imagesToProcess.map((image) => scheduler.addJob("recognize", image)));
        const ingredientsResults = results[0].data.lines
          .map((x) => x.text)
          .map((x) => x.replace(regex, ""))
          .join(";\n");
        setIngredientsFromImage(ingredientsResults);
        const instructionsResults = results[1].data.paragraphs
          .map((x) => x.text)
          .map((x) => x.replace(regex, " "))
          .join(";\n");
        setInstructionsFromImage(instructionsResults);

        // If only Ingredients will be processed
      } else if (imagesToProcess[0] !== "" && imagesToProcess[1] === "") {
        const results = await scheduler.addJob("recognize", imagesToProcess[0]);
        const ingredientsResults = results.data.lines
          .map((x) => x.text)
          .map((x) => x.replace(regex, ""))
          .join(";\n");
        setIngredientsFromImage(ingredientsResults);

        // If only Instructions will be processed
      } else if (imagesToProcess[0] === "" && imagesToProcess[1] !== "") {
        const results = await scheduler.addJob("recognize", imagesToProcess[1]);
        const instructionsResults = results.data.paragraphs
          .map((x) => x.text)
          .map((x) => x.replace(regex, " "))
          .join(";\n");
        setInstructionsFromImage(instructionsResults);
      }

      setTrimText(true);
    } else {
      setSnackbar("Please mark at least one category to process", "error");
    }
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const handleCallback = (dataFromChild) => {
    if (dataFromChild.length > 0) {
      const [file] = dataFromChild;
      const fileWithPreview = [{ ...file, preview: URL.createObjectURL(file) }];
      setFiles(fileWithPreview);
    }
  };

  const handleProceed = () => {
    processRecipe();
  };

  const handleCancel = () => {
    setLoading(false);
    setFiles([]);
    //Doesn't actually cancel the workers...
  };

  const setIngredientsAndInstructions = () => {
    const regexName = /[0-9,|.](?<=[0-9])\s*(?:\w+)/g;
    const regexAmount = /^[0-9]+(([.,]?[0-9]+)|[0-9]*)/g;
    const regexMeassure = /(?<=[0-9]\s)\s*(?:\w+)\s*(?<=\s)/g;

    const newIngredientsArray = ingredientsFromImage
      .split(";")
      .map((x) => x.trim())
      .filter((x) => x !== "");
    for (let i = 0; i < newIngredientsArray.length; i++) {
      let currentName = "";
      let currentAmount = "";
      let currentMeassure = "";
      const element = newIngredientsArray[i];
      if (element.replace(regexName, "") !== "") {
        currentName = element.replace(regexName, "").trim();
      } else {
        currentName = element.match(/[^0-9]\D\w+/g)[0].trim();
      }
      if (element.match(regexAmount) !== null) {
        currentAmount = element.match(regexAmount)[0].trim();
      }
      if (element.match(regexMeassure) !== null) {
        currentMeassure = element.match(regexMeassure)[0].trim();
      }
      const newAmount = Number(currentAmount);
      const newIngredient = {
        name: currentName,
        measures: {
          metric: {
            amount: newAmount,
            unitShort: currentMeassure,
          },
        },
      };
      console.log(newIngredient);
      const updatedRecipe = produce(recipeRef.current, (newRecipe) => {
        if (recipeRef.current.extendedIngredients[0].name === "") {
          newRecipe.extendedIngredients[0] = newIngredient;
        } else {
          newRecipe.extendedIngredients.push(newIngredient);
        }
      });
      recipeRef.current = updatedRecipe;
    }

    const newInstructionsArray = instructionsFromImage
      .split(";")
      .map((x) => x.trim())
      .filter((x) => x !== "");

    for (let i = 0; i < newInstructionsArray.length; i++) {
      const element = newInstructionsArray[i];
      const newInstructions = { number: recipeRef.current.analyzedInstructions[0].steps.length + 1, step: element };

      const updatedRecipe = produce(recipeRef.current, (newRecipe) => {
        if (recipeRef.current.analyzedInstructions[0].steps[0].step === "") {
          newRecipe.analyzedInstructions[0].steps[0].step = element;
          newRecipe.analyzedInstructions[0].steps[0].number = 1;
        } else {
          newRecipe.analyzedInstructions[0].steps.push(newInstructions);
        }
      });
      recipeRef.current = updatedRecipe;
    }

    console.log(recipeRef.current);
    setRecipe(recipeRef.current);
    // setProgress(0);
    // setFiles([]);
    // setImagesToProcess(["", ""]);
    // setTrimText(false);
    // setOpenUpload(false);
  };

  return (
    <Modal
      className={styles.modal}
      open={openUpload}
      onClose={handleCloseUpload}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={openUpload}>
        <Paper className={styles.paper}>
          {files.length === 0 && <ImageDrop parentCallback={handleCallback} />}
          {files.length > 0 && trimText === false && (
            <Cropping
              files={files}
              setFiles={setFiles}
              imagesToProcess={imagesToProcess}
              setImagesToProcess={setImagesToProcess}
              handleProceed={handleProceed}
            />
          )}

          {loading && (
            <Modal
              className={styles.loadingModal}
              open={loading}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 300,
              }}
            >
              <Fade in={loading}>
                <Paper className={styles.loadingPaper}>
                  <div className={styles.loadingTitle}>
                    {progress !== 1 ? (
                      <>
                        <Typography align="center" variant="h5">
                          Processing
                        </Typography>
                        <Loader size={5} distance={4} />
                      </>
                    ) : (
                      <Typography align="center" variant="h5">
                        Completed!
                      </Typography>
                    )}
                  </div>
                  <Loadingbar progress={progress} />
                  <div className={styles.buttonDiv}>
                    <Button variant="outlined" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </Paper>
              </Fade>
            </Modal>
          )}
          {trimText && files.length !== 0 && (
            <div className={styles.editTextFromImage}>
              <div className={styles.inputsAndImage}>
                <div className={styles.textFields}>
                  <TextField
                    label="Ingredients"
                    multiline
                    rowsMax={6}
                    variant="outlined"
                    value={ingredientsFromImage}
                    onChange={(e) => setIngredientsFromImage(e.target.value)}
                    helperText="Please separate every entry with a ;"
                  />

                  <TextField
                    label="Instructions"
                    multiline
                    rowsMax={6}
                    variant="outlined"
                    value={instructionsFromImage}
                    onChange={(e) => setInstructionsFromImage(e.target.value)}
                    helperText="Please separate every entry with a ;"
                  />
                </div>
                <div className={styles.imagePreview}>
                  <TransformWrapper>
                    <TransformComponent>
                      <img src={files[0].preview} alt="" />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
              </div>
              <Button variant="contained" color="primary" onClick={setIngredientsAndInstructions}>
                Done
              </Button>
            </div>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
};
export default ScanRecipe;
