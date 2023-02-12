import LineChart from "@/components/chart/LineChart";
import CsvUploader from "@/components/import/CsvUploader";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { prisma } from "../../server/db/client";

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
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Home({ data }: any) {
  function simpleArraySum(ar: number[]) {
    var sum = 0;
    for (var i = 0; i < ar.length; i++) {
      if (typeof ar[i] == `number`) sum += ar[i];
    }
    return sum;
  }
  const [years, setYears] = useState(
    data.jsonArray.map((m: any, i: number) => {
      const dataDate = new Date(m.Date);
      const year = dataDate.getFullYear();
      return year;
    })
  );
  useEffect(() => {
    const newYearsDuplicatesRemoved = years.filter(
      (c: number, index: number) => {
        return years.indexOf(c) === index;
      }
    );
    setYears(newYearsDuplicatesRemoved);
  }, []);

  const [dataState, setDataState] = useState({
    labels: years,
    datasets: [
      {
        label: "UBCV",
        data: years.map((year: number) => {
          const everyYearDataOBJ = data.jsonArray.filter((m: any) => {
            const dataDate = new Date(m.Date);
            if (dataDate.getUTCFullYear() == year) {
              return m;
            }
          });
          const theValueOfTrash = everyYearDataOBJ.map((m: any) => {
            for (const key in m) {
              if (key == "Transfer Station Landfill Garbage (tonnes) (UBCV)") {
                const stringOfValue = m[key]
                // console.log(stringOfValue);
                return stringOfValue;
              }
            }
          });
          // console.log(theValueOfTrash);
          const trashValuesButInNumber = theValueOfTrash.map((m: any) => {
            if (m != "NA") {
              return parseInt(m);
            }
          });
          const arraySum = simpleArraySum(trashValuesButInNumber);
          // console.log(arraySum);
          return arraySum;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  return (
    <>
      <h1>bow</h1>
      {/* <CsvUploader /> */}
      <LineChart chartData={dataState}  />
    </>
  );
}

export async function getServerSideProps() {
  const jsonArrayFromBackend = await prisma.testingData.findUnique({
    where: {
      id: 1,
    },
  });

  const jsonArrayFromBackendJSON = JSON.parse(
    JSON.stringify(jsonArrayFromBackend)
    );
    // console.log(jsonArrayFromBackendJSON);

  return {
    props: {
      data: jsonArrayFromBackendJSON,
    }, // will be passed to the page component as props
  };
}
