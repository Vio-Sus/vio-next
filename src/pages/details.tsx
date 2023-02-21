import LineChart from "@/components/chart/LineChart";
import BarChart from "@/components/chart/BarChart";
import PieChart from "@/components/chart/PieChart";
import CsvUploader from "@/components/import/CsvUploader";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap"
import YearAndMaterialInputs from "@/components/YearlyComparison/YearAndMaterialInputs"

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

  const [whatGraphToShow, setWhatGraphToShow] = useState("")
  const [availableGraphs, setAvailableGraphs] = useState(["Line", "Bar", "Pie"])
  const [dataState, setDataState] = useState({
    labels: years,
    datasets: [
      {
        label: "UBCV",
        data: years.map((year: number, index: number) => {
          // console.log(datasetsData)
          return allDataSum[index]
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });



  console.log("dataset", dataState);

  async function handleButtonClick(click: string) {
    
  }

  return (
    <>     
      <Button ButtonArray={availableGraphs} onClick={setWhatGraphToShow} /> 
      {whatGraphToShow === "Line" && <LineChart chartData={dataState} />}
      {whatGraphToShow === "Bar" && <BarChart chartData={dataState} />}
      {whatGraphToShow === "Pie" && <PieChart chartData={dataState} />}

      {/* <YearAndMaterialInputs/> */}
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

  // console.log("jsonArrayFromBackendJSON",jsonArrayFromBackendJSON.jsonArray);

  const allTheYearWithDuplicates = jsonArrayFromBackendJSON.jsonArray.map((m: any, i: number) => {
    // console.log("m", m)
    const dataDate = new Date(m.Date);
    const year = dataDate.getFullYear();
    // console.log("year", year)
    return year;
  })

  const newYearsDuplicatesRemoved = allTheYearWithDuplicates.filter(
    (c: number, index: number) => {
      return allTheYearWithDuplicates.indexOf(c) === index;
    }
  );

  // console.log("newYearsDuplicatesRemoved", newYearsDuplicatesRemoved)

  const allTheDataWithDuplicates =
    newYearsDuplicatesRemoved.map((year: number) => {
      const everyYearDataOBJ = jsonArrayFromBackendJSON.jsonArray.filter((m: any) => {
        const dataDate = new Date(m.Date);
        if (dataDate.getUTCFullYear() == year) {
          return m;
        }
      });
      // console.log("allTheDataWithDuplicates", allTheDataWithDuplicates);
      const theValueOfTrash = everyYearDataOBJ.map((m: any) => {
        for (const key in m) {
          if (key == "Transfer Station Landfill Garbage (tonnes) (UBCV)") {
            const stringOfValue = m[key];
            // console.log(stringOfValue);
            return stringOfValue;
          }
        }
      });
      // console.log("theValueOfTrash", theValueOfTrash);
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
  // console.log("dataSetsDuplicatesRemoved", dataSetsDuplicatesRemoved);
  // console.log("newYearsDuplicatesRemoved", newYearsDuplicatesRemoved);
  const newYearsDuplicatesRemovedJSON = JSON.parse(
    JSON.stringify(newYearsDuplicatesRemoved)
  );
  const dataSetsDuplicatesRemovedJSON = JSON.parse(
    JSON.stringify(dataSetsDuplicatesRemoved)
  );

  // console.log("newYearsDuplicatesRemovedJSON", newYearsDuplicatesRemovedJSON);
  // console.log("dataSetsDuplicatesRemovedJSON", dataSetsDuplicatesRemovedJSON);
  return {
    props: {
      data: jsonArrayFromBackendJSON,
      years: newYearsDuplicatesRemovedJSON,
      allDataSum: dataSetsDuplicatesRemovedJSON
    },
  };
}
