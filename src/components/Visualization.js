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

      const groupedData = d3.groups(data, d => d.lifeStage);
      const itemsInLifeStages = countPerLifeStage(data);

      const colourScale = d3.scaleLinear()
        .domain([0, numLifeStages])
        .range(["lightgreen", "darkgreen"]);

      const arc = d3.arc()
        .startAngle((d, index) => index * (2 * Math.PI) / itemsInLifeStages[d.lifeStage])
        .endAngle((d, index) => (index + 1) * (2 * Math.PI) / itemsInLifeStages[d.lifeStage])
        .padAngle(0)
        .innerRadius((d) => d.lifeStage * radiusStep)
        .outerRadius((d) => (d.lifeStage + 1) * radiusStep);

      const groups = chart.selectAll("g")
        .data(groupedData)
        .join("g");

      const arcs = groups.selectAll("path")
        .data(d => d[1]);
      const arcsEnter = arcs
        .enter()
        .append("path");
      arcsEnter.merge(arcs)
        .attr("d", arc)
        .attr("fill", (d) => colourScale(d.lifeStage));

      const text = groups.selectAll("text")
        .data(d => d[1]);
      const textEnter = text.enter()
        .append("text");
      textEnter.merge(text)
        .text((d) => d.value)
        .style("text-anchor", "middle")
        .attr("transform", (d, index) => `translate(${arc.centroid(d, index)})`);
    },
    [data]
  );

  return (
    <svg width={width} height={width}>
      <g ref={ref} id="chart" transform={`translate(${center[0]}, ${center[1]})`} />
    </svg>
  )
}

class Chart extends React.Component {
  componentDidMount() {
    this.initChart();
  }

  constructor(props) {
    super(props);
  }

  initChart() {
    const data = this.props.data;

    const itemsInLifeStages = this.countPerLifeStage(data);
    const totalLifeStages = 4;

    const groupedData = d3.groups(data, d => d.lifeStage);

    const width = 1600;
    const center = [width / 2, width / 2];
    const radiusStep = width / (totalLifeStages * 2);

    // Chart
    const svg = d3.select(`#${this.props.id}`)
      .append("svg")
      .attr("width", width)
      .attr("height", width);

    const chart = svg.append("g")
      .attr("transform", `translate(${center[0]}, ${center[1]})`);

    // With arcs
    const colourScale = d3.scaleLinear()
      .domain([0, totalLifeStages])
      .range(["lightgreen", "darkgreen"]);

    const arc = d3.arc()
      .startAngle((d, index) => index * (2 * Math.PI) / itemsInLifeStages[d.lifeStage])
      .endAngle((d, index) => (index + 1) * (2 * Math.PI) / itemsInLifeStages[d.lifeStage])
      .padAngle(0)
      .innerRadius((d) => d.lifeStage * radiusStep)
      .outerRadius((d) => (d.lifeStage + 1) * radiusStep);

    const groups = chart.selectAll("g")
      .data(groupedData)
      .enter()
      .append("g");

    groups.selectAll("path")
      .data(d => d[1])
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colourScale(d.lifeStage));

    groups.selectAll("text")
      .data(d => d[1])
      .enter()
      .append("text")
      .text((d) => d.value)
      .style("text-anchor", "middle")
      .attr("transform", (d, index) => `translate(${arc.centroid(d, index)})`);

    // groups.selectAll("line")
    //   .data(d => d[1])
    //   .enter()
    //   .append("line")
    //   .attr("x1", 0)
    //   .attr("y1", 0)
    //   .attr("x2", (d, index) => arc.centroid(d, index)[0])
    //   .attr("y2", (d, index) => arc.centroid(d, index)[1])
    //   .attr("stroke", "black");

    // // Circles
    // let circleGroups = chart.selectAll("g")
    //   .data(groupedData)
    //   .enter()
    //   .append("g");
    //
    // circleGroups.append('circle')
    //   .attr("r", (d, index) => (index + 1) * radiusStep)
    //   .style("fill", "rgba(255, 0, 0, 0.25)");
    //
    // // Items
    // circleGroups.selectAll("text")
    //   .data(d => d[1])
    //   .enter()
    //   .append("text")
    //   .style("text-anchor", "middle")
    //   .attr("transform", (d, index) => {
    //     const itemsInLifeStage = itemsInLifeStages[d.lifeStage];
    //     const r = (d.lifeStage + 1) * radiusStep; // TODO:
    //     const angle = index * (2 * Math.PI) / itemsInLifeStage;  // TODO:
    //     const x = r * Math.cos(angle);
    //     const y = r * Math.sin(angle);
    //     return `translate(${x}, ${y})`;
    //   })
    //   .text((d) => d.value);
  }

  updateChart() {

  }

  countPerLifeStage(data) {
    const result = {};

    for (let item of data) {
      if (item.lifeStage in result) {
        result[item.lifeStage] += 1;
      } else {
        result[item.lifeStage] = 1;
      }
    }

    return result;
  }

  render() {
    return null;
  }
}
