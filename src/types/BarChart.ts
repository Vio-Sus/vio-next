export interface ChartData {
    labels: string[];
    datasets: Datasets[];
  }
  export type Datasets = {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  };