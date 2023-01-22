import React, {useState} from 'react';
import './App.css';
import {Visualization} from "./components/Visualization";
import {WelcomePage} from "./components/WelcomePage";
import {Questions} from "./components/Questions";
import {EndPage} from "./components/EndPage";
import {Loading} from "./components/Loading";

const initialData = [
  {
    value: "Math class",
    lifeStage: 0,
  },
  {
    value: "Dance class",
    lifeStage: 0,
  },
  {
    value: "Cheerful",
    lifeStage: 0,
  },
  {
    value: "Helpful",
    lifeStage: 0,
  },
  {
    value: "Shy",
    lifeStage: 0,
  },
  {
    value: "Piano lessons",
    lifeStage: 0,
  },
  {
    value: "Finance",
    lifeStage: 0,
  },
  {
    value: "Math class",
    lifeStage: 1,
  },
  {
    value: "Art class",
    lifeStage: 1,
  },
  {
    value: "Ballet lessons",
    lifeStage: 1,
  },
  {
    value: "Volunteer at hospital",
    lifeStage: 1,
  },
  {
    value: "Perform at a local theatre",
    lifeStage: 1,
  },
  {
    value: "Perform at a local theatre",
    lifeStage: 2,
  },
];

function App() {
  // Possible values: "welcome", "questions", "loading", "vis", "end"
  const [currentPage, setCurrentPage] = useState("welcome")

  const [data, setData] = useState(initialData);

  const fetchFirstLifeStage = (info) => {
    // TODO:
    console.log(info);
  };

  let pageContent = null;
  switch (currentPage) {
    case "welcome":
      pageContent = <WelcomePage onStart={() => setCurrentPage("questions")}/>;
      break;
    case "questions":
      pageContent = <Questions onFinish={async (info) => {
        setCurrentPage("loading");
        await fetchFirstLifeStage(info);
        setCurrentPage("vis");
      }}/>;
      break;
    case "loading":
      pageContent = <Loading />;
      break;
    case "vis":
      pageContent = (
        <Visualization
          data={data}
          onAddItem={(item) => setData([...data, item])}
          onDeleteItem={(item) => {
            const newData = data.filter((i) => i.lifeStage !== item.lifeStage || i.value !== item.value);
            setData(newData);
          }}
        />
      );
      break;
    case "end":
      pageContent = <EndPage />;
  }

  return (
    <div id="app">
      {pageContent}
    </div>
  );
}

export default App;
