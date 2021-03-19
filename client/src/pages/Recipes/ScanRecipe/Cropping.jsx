import { useCallback, useState } from "react";
import { Button, Paper, Slider, Typography } from "@material-ui/core";
import styles from "./Cropping.module.scss";
import "react-dots-loader/index.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const Cropping = ({
  recipe,
  setRecipe,
  openUpload,
  setOpenUpload,
  files,
  setFiles,
  imagesToProcess,
  setImagesToProcess,
  handleProceed,
}) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const setIngredientsCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(files[0].preview, croppedAreaPixels, rotation);
      setImagesToProcess([croppedImage, imagesToProcess[1]]);
    } catch (e) {
      console.error(e);
    }
  };

  const setInstructionsCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(files[0].preview, croppedAreaPixels, rotation);
      setImagesToProcess([imagesToProcess[0], croppedImage]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper className={styles.CroppingMain}>
      <div className={styles.imageDiv}>
        <Cropper
          image={files[0].preview}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          cropSize={{ width, height }}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          restrictPosition={false}
          showGrid={false}
        />
      </div>
      <Paper className={styles.slidersAndButtons}>
        <div className={styles.slidersDiv}>
          <Typography>Zoom</Typography>
          <Slider
            value={zoom}
            min={0}
            max={3}
            step={0.01}
            aria-labelledby="zooooom"
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <Typography>Width</Typography>
          <Slider
            value={width}
            min={100}
            max={1000}
            step={10}
            aria-labelledby="width"
            onChange={(e, width) => setWidth(width)}
          />
          <Typography>Height</Typography>
          <Slider
            value={height}
            min={100}
            max={1000}
            step={10}
            aria-labelledby="height"
            onChange={(e, height) => setHeight(height)}
          />
          <Typography>Rotation</Typography>
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </div>
        <div className={styles.buttonDiv}>
          <Button variant="contained" color="primary" onClick={setIngredientsCrop}>
            Select Ingredients
          </Button>
          <img src={imagesToProcess[0]} alt="" />

          <Button variant="contained" color="primary" onClick={setInstructionsCrop}>
            Select Instructions
          </Button>
          <img src={imagesToProcess[1]} alt="" />
        </div>
        <div className={styles.resetProceed}>
          <Button variant="contained" color="secondary" onClick={() => setFiles([])}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={handleProceed}>
            Proceed
          </Button>
        </div>
      </Paper>
    </Paper>
  );
};

export default Cropping;
