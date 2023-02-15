import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface Props {
  chartData: ChartData;
}
export interface ChartData {
  labels: string[];
  datasets: Datasets[];
}
export type Datasets = {
  label: string;
  data: string | number;
  borderColor: string;
  backgroundColor: string;
};

export const options: object = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Transfer Station Landfill Garbage (tonnes) (UBCV)",
    },
  },
};

function PieChart({ chartData }: Props) {
  return <Pie data={chartData} options={options}/>;
}

export default PieChart;
