import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { Recipe } from "../../../../../common";
import { useStore } from "../../../store";

const ScanRecipe = () => {
  const { currentUser, setSnackbar } = useStore();
  const [ocr, setOcr] = useState("Recognizing...");
  const [file, setFile] = useState(require("./text.png").default);
  const worker = createWorker({
    logger: (m) => console.log(m),
  });
  const [recipe, setRecipe] = useState<Recipe>({
    title: "Test",
    sourceName: "",
    servings: 4,
    readyInMinutes: 45,
    extendedIngredients: [
      {
        name: "Cheese",
        measures: {
          metric: {
            amount: 2,
            unitShort: "dl",
          },
        },
      },
    ],
    image: "http://placekitten.com/400/200",
    dishTypes: ["Cheesy"],
    analyzedInstructions: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: "Eat cheese",
          },
        ],
      },
    ],
    createdBy: currentUser.id,
  });

  console.log(recipe, setRecipe, setSnackbar);

  const processRecipe = async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(file);
    setOcr(text);
    let resultsarray = text.split("\n");
    let filteredArray = resultsarray.filter((x) => x !== "");

    const regex = /[0-9,|.]+ (?<=[0-9]\s)(?:\w+)/;
    for (let i = 0; i < filteredArray.length; i++) {
      const element = filteredArray[i];
      const newObjectKey = element.replace(regex, "").trim();
      const newObjectValue = element.match(regex)?.[0];

      const newObject = { [newObjectKey]: newObjectValue };
      console.log(newObject);
      console.log(text);
      console.log(ocr);
    }
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
      const newObjectKey = element.replace(regex, "").trim();
      const newObjectValue = element.match(regex)?.[0];
      const newObject = { [newObjectKey]: newObjectValue };
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
      <img crossOrigin="anonymous" src={file} alt="" style={{ width: "250px" }} />
      <button onClick={() => processRecipe()}>Recognize text!</button>
    </>
  );
};
export default ScanRecipe;
