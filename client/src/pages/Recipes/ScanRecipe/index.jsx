import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Button, Modal, Backdrop, Fade, Paper, Typography } from "@material-ui/core";
import ImageDrop from "../../../components/ImageDrop";
import Loadingbar from "../../../components/Loadingbar";
import styles from "./index.module.scss";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";

const ScanRecipe = ({ recipe, setRecipe, openUpload, setOpenUpload, files, setFiles }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ocr, setOcr] = useState("Recognizing...");
  const worker = createWorker({
    logger: (m) => {
      if (m.status === "recognizing text") {
        setProgress(m.progress);
        if (m.progress === 1) {
          setTimeout(() => {
            setLoading(false);
            setOpenUpload(false);
            setProgress(0);
            setFiles([]);
          }, 2000);
        }
      }
    },
  });

  const processRecipe = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(files[0]);
    setOcr(text);
    let resultsarray = text.split("\n");
    let filteredArray = resultsarray.filter((x) => x !== "");

    const regex = /[0-9,|.]+ (?<=[0-9]\s)(?:\w+)/;
    for (let i = 0; i < filteredArray.length; i++) {
      const element = filteredArray[i];
      const newObjectKey = element.replace(regex, "").trim();
      const newObjectValue = element.match(regex)?.[0];
      const newObject = { [newObjectKey]: newObjectValue };
      // console.log(newObject);
      // console.log(text);
      console.log(ocr);
    }
    console.log(filteredArray);
  };

  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const handleCallback = (dataFromChild) => {
    const allowedFileTypes = ["image/png", "image/jpeg"];

    if (allowedFileTypes.indexOf(dataFromChild[0].type) > -1) {
      setFiles(dataFromChild.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
    }
  };

  const handleProceed = () => {
    setLoading(true);
    processRecipe();
  };

  const handleCancel = () => {
    setLoading(false);
    setFiles([]);
    //Doesn't actually cancel the workers...
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
                        {" "}
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
          {files.length > 0 && (
            <div className={styles.imageDiv}>
              <img src={files[0].preview}></img>
              <div className={styles.buttonDiv}>
                <Button variant="contained" color="secondary" onClick={() => setFiles([])}>
                  Reset
                </Button>
                <Button variant="contained" color="primary" onClick={handleProceed}>
                  Proceed
                </Button>
              </div>
            </div>
          )}
          {files.length === 0 && <ImageDrop parentCallback={handleCallback} />}
        </Paper>
      </Fade>
    </Modal>
  );
};
export default ScanRecipe;
