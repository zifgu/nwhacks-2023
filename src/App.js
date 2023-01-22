import React, {useState} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Visualization} from "./components/Visualization";
import {Button, Dropdown, FormControl} from "react-bootstrap";

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

const CustomToggle = React.forwardRef(({ children, onClick, id }, ref) => (
  <Button
    id={id}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy, id }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    );
  },
);

function App() {
  const [data, setData] = useState(initialData);
  const [deleting, setDeleting] = useState(false);
  const [lifeStage, setLifeStage] = useState(0);
  const [item, setItem] = useState("");

  const addItem = () => {
    setData([
      ...data,
      {
        lifeStage: lifeStage,
        value: item,
      }
    ]);

    setItem("");
  }

  return (
    <div>
      <Visualization
        data={data}
        deleting={deleting}
        handleDelete={(d) => {
          const newData = data.filter((item) => item.lifeStage !== d.lifeStage || item.value !== d.value);
          setData(newData);
        }}
      />
      <div id="vis-instructions">
        Pan and zoom.
      </div>
      <div id="vis-add-delete-form">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="vis-add-toggle">
            +
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu} id="vis-add-menu">
            <div>
              <FormControl
                id="vis-add-input"
                type="text"
                value={item}
                onChange={(event) => setItem(event.target.value)}
              />
              <Button
                id="vis-add-button"
                onClick={addItem}
                disabled={item.length === 0}
              >
                Add
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          id="vis-delete-toggle"
          onClick={() => setDeleting(!deleting)}
        >
          x
        </Button>
      </div>
    </div>
  );
}

export default App;
