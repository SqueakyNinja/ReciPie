import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

const OCR = () => {
  const [ocr, setOcr] = useState("Recognizing...");
  const [file, setFile] = useState(require("./text.png").default);
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(file);
    setOcr(text);
    let resultsarray1 = text.split("\n");
    let filteredArray1 = resultsarray1.filter((x) => x !== "");
    console.log(resultsarray1);
    console.log(filteredArray1);

    // for (let i = 0; i < text.length; i++) {
    //   const element = text[i];
    //   console.log(element);
    // }
    console.log(text);
    console.log(ocr);
  };

  useEffect(() => {
    let testArray = [
      "Ingredienser (kladdkaka):",
      "225 g smor",
      "3,5 dl strosocker",
      "2,25 dL brunt farinsocker stro",
      "1 msk vaniljsocker",
      "4 stora agg",
      "3,5 dl vetemjol",
      "1 dl kakao",
      "1 krm salt",
    ];
    const regex = /[0-9,|.]+ (?<=[0-9]\s)(?:\w+)/;
    for (let i = 0; i < testArray.length; i++) {
      const element = testArray[i];
      let newObjectKey = element.replace(regex, "").trim();
      let newObjectValue = "";
      // if (element.match(regex) !== null) {
      //   newObjectValue = element.match(regex)[0];
      // }

      console.log("Key: " + newObjectKey);
      console.log("Value: " + newObjectValue);
      let newObject = { newObjectKey: newObjectValue };
      console.log(newObject);
      // return newObject;
    }
  }, []);

  const uploadImage = (event: any) => {
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (allowedFileTypes.indexOf(event.target.files[0].type) > -1) {
      setFile(URL.createObjectURL(event.target.files[0]));
      console.log("rätt filtyp!");
    } else {
      console.log("fel filtyp! eller något annat knas");
    }
  };
  useEffect(() => {
    if (file) {
      console.log("changing file to read");
      setFile(file);
    }
  }, [file]);

  return (
    <>
      <h2>Trying to read a file</h2>
      <div>
        <input
          type="file"
          name=""
          id="fileUpload"
          onChange={(file) => {
            uploadImage(file);
          }}
        />
      </div>
      <img
        crossOrigin="anonymous"
        src={file}
        alt=""
        style={{ width: "500px" }}
      />
      <button onClick={() => doOCR()}>Recognize text!</button>
    </>
  );
};
export default OCR;
