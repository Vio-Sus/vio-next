import {Line} from "react-chartjs-2"
import React from 'react';

import type { ChartData, Datasets } from "@/types/LineChart";

export interface Props {
    chartData: ChartData;
}

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { type } from "os";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export const options: object = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "",

      },
    },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Weight (tonnes)' // i feel like this should be done in the "monthlybreakdown.tsx" file. need to update the config there.
          }
        }
      } 
  };

export default function LineChart({chartData}: Props) {
    
    return (
        <Line data={chartData} options={options}/>
    )
}