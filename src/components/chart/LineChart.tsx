import {Line} from "react-chartjs-2"
import React from 'react';

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
        text: "Transfer Station Landfill Garbage (tonnes) (UBCV)",
      },
    },
  };

export default function LineChart({chartData}: Props) {
    
    return (
        <Line data={chartData} options={options}/>
    )
}