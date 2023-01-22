import React, {useEffect, useState} from "react";
import * as d3 from "d3";
import "./Visualization.css";
import {Button, Dropdown, FormControl} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Loading} from "./Loading";

const CustomToggle = React.forwardRef(({ children, onClick, id, show }, ref) => (
  <Button
    id={id}
    className={show ? "active" : ""}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Button>
));

const CustomMenu = React.forwardRef(({ children, onClick, id }, ref) => {
    const [show, setShow] = useState(false);

    return (
        <Button
            id={id}
            className={show ? "active" : ""}
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                setShow(!show);
                onClick(e);
            }}
        >
            {children}
        </Button>
    );
});

export function Visualization({data, onAddItem, onDeleteItem, onNext, loading}) {
  const [deleting, setDeleting] = useState(false);
  const [lifeStage, setLifeStage] = useState(0);
  const [item, setItem] = useState("");

  const addItem = () => {
    onAddItem(
      {
        lifeStage: lifeStage,
        value: item,
      }
    );

    setItem("");
  };

  const deleteItem = (item) => {
    onDeleteItem(item);
  };

  return (
    <div>
      {loading && <Loading />}
      <Chart
        data={data}
        deleting={deleting}
        handleDelete={deleteItem}
      />
      <div id="vis-instructions">
        Pan and zoom.
      </div>
      
      <div id="vis-add-delete-form">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="vis-add-toggle">
            <FontAwesomeIcon icon={faPlus}/>
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu} id="vis-add-menu">
            <div>
              <FormControl
                id="vis-add-input"
                type="text"
                value={item}
                placeholder={'Add Traits/Interests'}
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
          className={deleting ? "active" : ""}
          onClick={() => setDeleting(!deleting)}
        >
          <FontAwesomeIcon icon={faTimes}/>
        </Button>
        <Button
          id="vis-next-button"
          onClick={() => onNext()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Chart({ data, deleting, handleDelete }) {
  const ref = React.useRef();
  const [k, setK] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform;
      setK(k);
      setX(x);
      setY(y);
    });
    d3.select(ref.current).call(zoom);
  }, []);

  useEffect(
    () => {
      const chart = d3.select(ref.current).select('g').select('g');

      const numLifeStages = [...new Set(d3.map(data, d => d.lifeStage))].length;
      const radiusStep = window.innerWidth / (numLifeStages * 2);
      const circleRadius = 75;

      const regularColourScale = d3.scaleLinear()
        .domain([0, numLifeStages])
        .range(["rgb(22,124,82)", "rgb(214,243,223)"]);

      const deletingColourScale = d3.scaleLinear()
        .domain([0, numLifeStages])
        .range(["rgb(190,46,46)", "rgb(238,167,167)"]);

      const circles = chart.selectAll("circle")
        .data(data, d => d.value)
        .join("circle")
        .attr("class", () => "item " + (deleting ? "deleting" : ""))
        .attr("fill", (d) => deleting ? deletingColourScale(d.lifeStage) : regularColourScale(d.lifeStage))
        .attr("r", () => circleRadius)
        .on("click", (event) => {
          if (deleting) {
            handleDelete(event.target.__data__);
          }
        });

      const text = chart.selectAll("text")
        .data(data, d => d.value)
        .join("text")
        .attr("class", "label")
        .text(d => d.value)
        .style("text-anchor", "middle");

      const simulation = d3
        .forceSimulation()
        .force(
          "collide",
          d3.forceCollide()
            .strength(0.5)
            .radius(d => circleRadius)
            .iterations(1)
        )
        .force(
          "radial",
          d3.forceRadial()
            .strength(0.1)
            .radius(d => radiusStep * (d.lifeStage + 1) - radiusStep / 2)
        ); // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation.nodes(data).on("tick", function (d) {
        circles.attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);

        text.attr("x", (d) => d.x)
          .attr("y", (d) => d.y);
      });
    },
    [data, deleting]
  );

  return (
    <div id="vis">
      <svg ref={ref} width="100%" height="100%">
        <g transform={`translate(${x},${y})scale(${k})`}>
          <g transform={`translate(${window.innerWidth / 2}, ${window.innerHeight / 2})`}></g>
        </g>
      </svg>
    </div>
  );
}
