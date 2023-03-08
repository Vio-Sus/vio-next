export type ChartData = {
    labels: string[];
    datasets: Datasets[];
    options?: {};
  }
export type Datasets = {
label: string;
data: string | number | number[];
fill: boolean;
borderColor: string;
backgroundColor: string;
tension: number;
options?: {};
};

// need to refactor this into a separate file for bar and line chart