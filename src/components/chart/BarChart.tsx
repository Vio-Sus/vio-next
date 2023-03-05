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

import type { ChartData, Datasets } from "@/types/BarChart";

export interface Props {
    chartData: ChartData;
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
      text: "Waste Items for UBCV",
    },
    scales: {
      y: {
        // beginAtZero: true,
        suggestedMin: 0
      }
    }
  },
};


export default function App({chartData}: Props) {

    return <Bar options={options} data={chartData} />;

}
  