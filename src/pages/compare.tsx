import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/chart/BarChart";
import { prisma } from "../../server/db/client";
import YearsLabel from "@/components/chooseYears/YearLabels";
import Button from "@/components/button/ButtonMap";

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

export default function Home({ transformedData, years }: any) {
  const [yearOne, setYearOne] = useState<string>("");
  const [yearTwo, setYearTwo] = useState<string>("");
  const [firstYearSum, setFirstYearSum] = useState<number>(0);
  const [secondYearSum, setSecondYearSum] = useState<number>(0);
  const [material, setMaterial] = useState<string[]>([
    "Containers",
    "Mixed Paper",
    "Office Paper",
    "Refuse (ICI Waste)",
    "Corrugated Cardboard",
    "Transfer Station Landfill Garbage",
  ]);
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<any>({});
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [dataState, setDataState] = useState({} as ChartData);

  useEffect(() => {
    setDataState({
      labels: [formData.yearOne, formData.yearTwo],
      datasets: [
        {
          label: "UBCV: " + formData.material,
          data: [firstYearSum, secondYearSum],
          borderColor: "#ddeeef",
          backgroundColor: "#ddeeef",
        },
      ],
    });
  }, [formData, firstYearSum, secondYearSum]);

  // console.log("formData", formData);
  // console.log("dataset", dataState);

  const firstYear = useMemo(() => {
    return transformedData.filter((data: any) => {
      if (
        +data.year == formData.yearOne &&
        data.material == formData.material
      ) {
        return data;
      }
    });
  }, [formData]);

  const secondYear = useMemo(() => {
    return transformedData.filter((data: any) => {
      if (
        +data.year == formData.yearTwo &&
        data.material == formData.material
      ) {
        return data;
      }
    });
  }, [formData]);

  useEffect(() => {
    let sum = 0;
    firstYear.forEach((element: any) => {
      sum += element.weight;
    });

    setFirstYearSum(sum);

    let sum2 = 0;
    secondYear.forEach((element: any) => {
      sum2 += element.weight;
    });
    setSecondYearSum(sum2);
  }, [firstYear, secondYear]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(yearOne, yearTwo, material[0]);
    setFormData({
      yearOne: +yearOne,
      yearTwo: +yearTwo,
      material: material[0],
    });
    console.log("formData", formData);
    setShowGraph(true);
  };

  return (
    <>
      {!showGraph ? (
        <YearsLabel setYearOne={setYearOne} year={year} setYearTwo={setYearTwo} setMaterial={setMaterial} material={material} handleSubmit={handleSubmit} />
      ) : (
        <>
         <YearsLabel setYearOne={setYearOne} year={year} setYearTwo={setYearTwo} setMaterial={setMaterial} material={material} handleSubmit={handleSubmit} />
          {/* // not sure how to fix this error here but everything still works i guess... */}
          <BarChart chartData={dataState} />
        </>
      )}
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

  const transformedData: any = [];
  jsonArrayFromBackendJSON.jsonArray.forEach((m: any) => {
    const year = new Date(m.Date).getFullYear().toString();
    Object.keys(m).forEach((key) => {
      if (key !== "Date" && m[key] !== "NA") {
        const material = key.replace(" (tonnes) (UBCV)", "");
        const weight = m[key];
        transformedData.push({ year, material, weight });
      }
    });
  });

  const years = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.year);
    return acc;
  }, new Set<number>());

  return {
    props: {
      transformedData: transformedData,
      years: Array.from(years),
    },
  };
}
