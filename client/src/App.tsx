import React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  useEffect(() => {
    callBackendAPI()
      .then((res: any) => setData(res.express))
      .catch((err: any) => console.log(err));
  }, []);

  let testRecipe = {
    title: "Kladdkaka",
    image: "url.com",
    instructions: {
      1: "Sätt ugnen på 175 grader",
      2: "Smält smöret i en kastrull. Lyft av kastrullen från plattan.",
      3: "Rör ner socker och ägg, blanda väl. Rör ner övriga ingredienser så att allt blir väl blandat.",
      4: "Häll smeten i en smord och bröad form med löstagbar kant, ca 24 cm i diameter.",
      5: "Grädda mitt i ugnen ca 15 min. Kakan blir låg med ganska hård yta och lite kladdig i mitten.",
      6: "Låt kakan kallna. Pudra över florsocker. Servera med grädde eller glass och frukt.",
    },
    ingredients: {
      smör: 100 + "g",
      strösocker: 2.5 + "dl",
      ägg: 2 + "st",
      vetemjöl: 1 + "dl",
      kakao: 3 + "msk",
      vaniljsocker: 1 + "tsk",
      florsocker: "",
      vispgrädde: "",
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
      </header>
      {console.log(testRecipe)}
      <p className="App-intro">{data}</p>
    </div>
  );
};

export default App;
