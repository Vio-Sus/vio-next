import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
export interface Props {
    chartData: ChartData;
}
export interface ChartData {
    labels: string[];
    datasets: Datasets[];
}
export type Datasets = {
    label: string;
    data: (string | number);
    borderColor: string;
    backgroundColor: string;
}
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


export default function App({chartData}: Props) {
    return <Bar options={options} data={chartData} />;
  }
  