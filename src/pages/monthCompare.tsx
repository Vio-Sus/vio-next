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
  data: string | number | number[];
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
const colors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0"];

export default function Home({
  transformedData,
  years,
  months,
  dataUntouched,
}: any) {
  const [monthOne, setMonthOne] = useState<string>("All Year");
  const [monthTwo, setMonthTwo] = useState<string>("All Year");
  const [yearOne, setYearOne] = useState<string>("2012");
  const [yearTwo, setYearTwo] = useState<string>("2012");
  const [firstYearSum, setFirstYearSum] = useState<number>(0);
  const [secondYearSum, setSecondYearSum] = useState<number>(0);
  const [chosenMaterial, setChosenMaterial] = useState<string[]>([]);

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
    let yearOneLabel = formData.yearOne;
    let yearOneSum = firstYearSum;
    let yearTwoLabel = formData.yearTwo;
    let yearTwoSum = secondYearSum;

    if (monthOne !== "All Year") {
      yearOneLabel = `${monthOne} of ${formData.yearOne}`;
      yearOneSum = dataUntouched
        .filter(
          (m: any) =>
            monthOne == m.monthName &&
            yearOne == m.year &&
            m.material == material
        )
        .reduce((accumulator: number, currentValue: any) => {
          return accumulator + currentValue.weight;
        }, 0);
    }

    if (monthTwo !== "All Year") {
      yearTwoLabel = `${monthTwo} of ${formData.yearTwo}`;
      yearTwoSum = dataUntouched
        .filter(
          (m: any) =>
            monthTwo == m.monthName &&
            yearTwo == m.year &&
            m.material == material
        )
        .reduce((accumulator: number, currentValue: any) => {
          return accumulator + currentValue.weight;
        }, 0);
    }
    setDataState({
      labels: [yearOneLabel, yearTwoLabel],
      datasets: [
        {
          label: "UBCV: " + formData.material,
          data: [yearOneSum, yearTwoSum],
          borderColor: "#ddeeef",
          backgroundColor: "#ddeeef",
        },
      ],
    });
  }, [formData, firstYearSum, secondYearSum]);

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
    // console.log(yearOne, yearTwo, material[0]);
    setFormData({
      yearOne: +yearOne,
      yearTwo: +yearTwo,
      material: material[0],
    });
    // console.log("formData", formData);
    setShowGraph(true);
  };
  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    if (e.target.checked) {
      setChosenMaterial([...chosenMaterial, e.target.value]);
    } else {
      setChosenMaterial((prevMaterials) =>
        prevMaterials.filter((m) => m !== e.target.value)
      );
    }
  };
  return (
    <>
      {!showGraph ? (
        <YearsLabel
          setYearOne={setYearOne}
          year={year}
          setYearTwo={setYearTwo}
          setMaterial={setMaterial}
          material={[
            "Containers",
            "Mixed Paper",
            "Office Paper",
            "Refuse (ICI Waste)",
            "Corrugated Cardboard",
            "Transfer Station Landfill Garbage",
          ]}
          handleSubmit={handleSubmit}
          setMonthTwo={setMonthTwo}
          setMonthOne={setMonthOne}
          yearOne={yearOne}
          yearTwo={yearTwo}
          monthOne={monthOne}
          monthTwo={monthTwo}
          months={["All Year", ...months]}
          onChange={handleMaterialChange}
        />
      ) : (
        <>
          <YearsLabel
            setYearOne={setYearOne}
            year={year}
            setYearTwo={setYearTwo}
            setMaterial={setMaterial}
            material={[
              "Containers",
              "Mixed Paper",
              "Office Paper",
              "Refuse (ICI Waste)",
              "Corrugated Cardboard",
              "Transfer Station Landfill Garbage",
            ]}
            handleSubmit={handleSubmit}
            setMonthTwo={setMonthTwo}
            setMonthOne={setMonthOne}
            yearOne={yearOne}
            yearTwo={yearTwo}
            monthOne={monthOne}
            monthTwo={monthTwo}
            months={["All Year", ...months]}
            onChange={handleMaterialChange}
          />
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

  let dataUntouched: (string | number | any)[] = [];
  jsonArrayFromBackendJSON.jsonArray.forEach((m: any) => {
    const month = new Date(m.Date).getUTCMonth().toString();
    const year = new Date(m.Date).getFullYear().toString();
    Object.keys(m).forEach((key) => {
      // if (m[key] == "NA") m[key] = 0;
      if (key !== "Date" && m[key] !== "NA") {
        const material = key.replace(" (tonnes) (UBCV)", "");
        const weight: number | string = m[key];
        const monthName: string = new Date(
          2000,
          parseInt(month)
        ).toLocaleString("default", { month: "long" });
        // console.log(monthName, material, weight, year)
        dataUntouched.push({ year, monthName, material, weight });
      }
    });
  });

  const years = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.year);
    return acc;
  }, new Set<number>());

  const months = dataUntouched.reduce((acc: Set<number>, category: any) => {
    acc.add(category.monthName);
    return acc;
  }, new Set<number>());

  return {
    props: {
      dataUntouched: dataUntouched,
      transformedData: transformedData,
      years: Array.from(years),
      months: Array.from(months),
    },
  };
}
