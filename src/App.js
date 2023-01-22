import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Visualization} from "./components/Visualization";
import {Button, FormControl} from "react-bootstrap";

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
  const [lifeStage, setLifeStage] = useState(0);
  const [item, setItem] = useState("");

  const addItem = () => {
    setData([...data, {
      lifeStage: lifeStage,
      value: item,
    }]);

    setLifeStage(0);
    setItem("");
  }

  return (
    <div>
      <FormControl type="text" value={item} onChange={(event) => setItem(event.target.value)}/>
      <FormControl type="number" value={lifeStage} onChange={(event) => setLifeStage(parseInt(event.target.value))}/>
      <Button onClick={addItem}>Add</Button>
      <Visualization
        data={data}
        width={1200}
        numLifeStages={3}
      />
    </div>
  );
}

export default App;
