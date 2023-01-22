import React from "react";
import * as d3 from "d3";
import "./Visualization.css";

export function Visualization(props) {
  return (
    <div id="vis">
      <Chart2 id="vis" {...props}/>
    </div>
  );
}

function useD3(renderChartFn, dependencies) {
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  return ref;
}

function Chart2({ data, width, numLifeStages }) {
  const center = [width / 2, width / 2];
  const radiusStep = width / (numLifeStages * 2);
  const textOffsetRadius = radiusStep / 3;

  const ref = useD3(
    (chart) => {
      function countPerLifeStage(d) {
        const result = {};

        for (let item of d) {
          if (item.lifeStage in result) {
            result[item.lifeStage] += 1;
          } else {
            result[item.lifeStage] = 1;
          }
        }

        return result;
      }

      function getTextAngle(d, index) {
        const itemsInLifeStage = itemsInLifeStages[d.lifeStage];
        return index * (2 * Math.PI) / itemsInLifeStage;
      }

      function getTextTransform(d, index) {
        const angle = getTextAngle(d, index);
        const r = (d.lifeStage + 1) * radiusStep - textOffsetRadius;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        return [x, y];
      }

      const groupedData = d3.groups(data, d => d.lifeStage);
      const itemsInLifeStages = countPerLifeStage(data);

      const colourScale = d3.scaleLinear()
        .domain([0, numLifeStages])
        .range(["lightgreen", "darkgreen"]);

      // Rings
      const arc = d3.arc()
        .startAngle(0)
        .endAngle(2 * Math.PI)
        .innerRadius((d) => d[0] * radiusStep)
        .outerRadius((d) => (d[0] + 1) * radiusStep);

      const rings = chart.selectAll("path")
        .data(groupedData, d => d[0]);

      const ringsEnter = rings
        .enter()
        .append("path");

      ringsEnter.merge(rings)
        .attr("d", arc)
        .attr("fill", (d) => {
          return colourScale(d[0]);
        });

      rings.exit().remove();

      // Group by life stage
      const lifeStageGroups = chart.selectAll("g")
        .data(groupedData)
        .join("g");

      // Rects
      const textRects = lifeStageGroups.selectAll("rect")
        .data(d => d[1], d => d.value);

      const textRectsEnter = textRects.enter()
        .append("rect")
        .style("fill", "lightpink");

      // Text
      const text = lifeStageGroups.selectAll("text")
        .data(d => d[1], d => d.value);

      const textEnter = text.enter()
        .append("text");

      textEnter.merge(text)
        .text((d) => d.value)
        .each(function(d, index) {
          // Save calculated attributes
          d.bbox = this.getBBox();

          const angle = getTextAngle(d, index);
          d.anchor = (Math.PI / 2 <= angle && angle <= 3 * Math.PI / 2) ? "end" : "start";
        })
        .style("text-anchor", (d) => d.anchor)
        .transition()
        .duration(500)
        .attr("transform", (d, index) => {
          return `translate(${getTextTransform(d, index)})`;
        });

      text.exit().remove();

      // Update rect size and position
      const xMargin = 10;
      const yMargin = 2.5;

      textRects.merge(textRectsEnter)
        .attr("width", d => d.bbox.width + 2 * xMargin)
        .attr("height", d => d.bbox.height + 2 * yMargin)
        .attr("rx", d => d.bbox.height / 2);

      textRects.merge(textRectsEnter)
        .transition()
        .duration(500)
        .attr("transform", (d, index) => {
          const textTransform = getTextTransform(d, index);
          return `translate(${[
            textTransform[0] - xMargin - (d.anchor === "end" ? d.bbox.width : 0),
            textTransform[1] - yMargin - d.bbox.height * 3 / 4,
          ]})`;
        });
    },
    [data]
  );

  return (
    <svg width={width} height={width}>
      <g ref={ref} id="chart" transform={`translate(${center[0]}, ${center[1]})`} />
    </svg>
  )
}
