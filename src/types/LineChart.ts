export type ChartData = {
    labels: string[];
    datasets: Datasets[];
    options?: {};
  }
export type Datasets = {
label: string;
data: number[];
fill: boolean;
borderColor: string;
tension: number;
options?: {};
};

// need to refactor this into a separate file for bar and line chart