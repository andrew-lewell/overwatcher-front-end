import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import Chart from "chart.js";

const Graph = ({ chartData, chartOptions }) => {
  return (
    <div>
      <HorizontalBar data={chartData} options={chartOptions} />
    </div>
  );
};

Graph.defaultProps = {
  chartData: [],
  chartOptions: []
};

export default Graph;
