import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import type { ChartData, Datasets } from "@/types/BarChart";

export interface Props {
  chartData: ChartData;
  scale?: string;
}

import { Bar } from "react-chartjs-2";

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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Weight (tonnes)", // i feel like this should be done in the "monthlybreakdown.tsx" file. need to update the config there.
        },
      },
    },
  },
};

export default function App({ chartData, scale }: Props) {
  const options = useMemo(() => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: `The unit of mass is: ` + scale,
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: scale,
            },
          },
        },
      },
    };
    return options
  }, [scale]);



  return <Bar options={options} data={chartData} />;
}
