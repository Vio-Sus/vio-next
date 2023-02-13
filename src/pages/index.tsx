import LineChart from "@/components/chart/LineChart";
import BarChart from "@/components/chart/BarChart";
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

export default function Home({ data, years, allDataSum }: any) {


  const [dataState, setDataState] = useState({
    labels: years,
    datasets: [
      {
        label: "UBCV",
        data: years.map((year: number, index: number) => {
          // console.log(datasetsData)
          return allDataSum[index]
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
      <LineChart chartData={dataState} />
      <BarChart chartData={dataState} />
    </>
  );
}







export async function getServerSideProps() {
  function simpleArraySum(ar: number[]) {
    var sum = 0;
    for (var i = 0; i < ar.length; i++) {
      if (typeof ar[i] == `number`) sum += ar[i];
    }
    return sum;
  }
  const jsonArrayFromBackend = await prisma.testingData.findUnique({
    where: {
      id: 1,
    },
  });
  const jsonArrayFromBackendJSON = JSON.parse(
    JSON.stringify(jsonArrayFromBackend)
    );
    
    // console.log(jsonArrayFromBackendJSON.jsonArray);
    
    const allTheYearWithDuplicates = jsonArrayFromBackendJSON.jsonArray.map((m: any, i: number) => {
      const dataDate = new Date(m.Date);
      const year = dataDate.getFullYear();
      return year;
    })
    
    const newYearsDuplicatesRemoved = allTheYearWithDuplicates.filter(
      (c: number, index: number) => {
        return allTheYearWithDuplicates.indexOf(c) === index;
      }
      );
      
      const allTheDataWithDuplicates = 
      newYearsDuplicatesRemoved.map((year: number) => {
        const everyYearDataOBJ = jsonArrayFromBackendJSON.jsonArray.filter((m: any) => {
          const dataDate = new Date(m.Date);
          if (dataDate.getUTCFullYear() == year) {
            return m;
          }
        });
        const theValueOfTrash = everyYearDataOBJ.map((m: any) => {
          for (const key in m) {
            if (key == "Transfer Station Landfill Garbage (tonnes) (UBCV)") {
              const stringOfValue = m[key];
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
      })
      const dataSetsDuplicatesRemoved = allTheDataWithDuplicates.filter(
        (c: number, index: number) => {
          return allTheDataWithDuplicates.indexOf(c) === index;
        }
        );
        console.log(dataSetsDuplicatesRemoved)
        console.log(newYearsDuplicatesRemoved)
        const newYearsDuplicatesRemovedJSON = JSON.parse(
          JSON.stringify(newYearsDuplicatesRemoved)
          );
          const dataSetsDuplicatesRemovedJSON = JSON.parse(
            JSON.stringify(dataSetsDuplicatesRemoved)
            );
            
            return {
              props: {
                data: jsonArrayFromBackendJSON,
                years: newYearsDuplicatesRemovedJSON,
                allDataSum: dataSetsDuplicatesRemovedJSON
              }, 
            };
          }
