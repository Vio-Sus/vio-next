export interface ChartData {
    labels: string[];
    datasets: Datasets[];
  }
  export type Datasets = {
    label: string;
    data: string | number | number[];
    borderColor: string;
    backgroundColor: string;
  };