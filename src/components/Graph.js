import React from "react";
import { HorizontalBar } from "react-chartjs-2";

import "./Graph.css";

const Graph = ({ chartData, chartOptions }) => {
  return (
    <div className='graphContainer'>
      <HorizontalBar data={chartData} options={chartOptions} />
    </div>
  );
};

Graph.defaultProps = {
  chartData: [],
  chartOptions: []
};

export default Graph;
