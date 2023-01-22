import React, {useEffect} from "react";
import * as d3 from "d3";
import "./Visualization.css";

function randomValue(start, end) {
  return start + Math.random() * (end - start);
}

export function Visualization({ data, width }) {
  const ref = React.useRef();

  const center = [width / 2, width / 2];
  const circleRadius = 75;

  useEffect(
    () => {
      const chart = d3.select(ref.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .call(d3.zoom().on("zoom", function () {
          chart.attr("transform", d3.zoomTransform(this))
        }))
        .append("g");

      const numLifeStages = [...new Set(d3.map(data, d => d.lifeStage))].length;
      const radiusStep = width / (numLifeStages * 2);

      const colourScale = d3.scaleLinear()
        .domain([0, numLifeStages])
        .range(["rgb(22,124,82)", "rgb(214,243,223)"]);

      const circles = chart.selectAll("circle")
        .data(data, d => d.value)
        .join("circle")
        .attr("class", "item")
        .attr("fill", (d) => colourScale(d.lifeStage))
        .attr("r", () => circleRadius + randomValue(-5, 5));

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
    [data]
  );

  return (
    <div id="vis" ref={ref}></div>
  );
}
