import React, {useState} from 'react';
import './App.css';
import {Visualization} from "./components/Visualization";

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
  const [data, setData] = useState(initialData);

  return (
    <Visualization
      data={data}
      onAddItem={(item) => setData([...data, item])}
      onDeleteItem={(item) => {
        const newData = data.filter((i) => i.lifeStage !== item.lifeStage || i.value !== item.value);
        setData(newData);
      }}
    />
  );
}

export default App;
