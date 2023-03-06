import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/chart/BarChart";
import { prisma } from "../../server/db/client";
import YearsLabel from "@/components/compareMonthComponents/YearLabels";
import Button from "@/components/button/ButtonMap";
import MultipleYearCompare from "@/components/compareMonthComponents/multipleYear";

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

type WasteData = {
  year: string;
  monthName: string;
  material: string;
  weight: number;
};

type WasteDataArray = WasteData[];

export default function Home({
  transformedData,
  years,
  months,
  dataUntouched,
}: any) {
  const [monthOne, setMonthOne] = useState<string>("January");
  const [monthTwo, setMonthTwo] = useState<string>("January");
  const [extraMonthsArray, setExtraMonthsArray] = useState<string[]>([]);
  const [yearOne, setYearOne] = useState<string>("2012");
  const [yearTwo, setYearTwo] = useState<string>("2012");
  const [extraYearsArray, setExtraYearsArray] = useState<string[]>([]);
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
    const yearOneData = chosenMaterial.map((m) => {
      const dataFound = dataUntouched.find((inputUntouchedData: any) => {
        return (
          inputUntouchedData.year === yearOne &&
          inputUntouchedData.monthName === monthOne &&
          inputUntouchedData.material === m
        );
      });
      if (dataFound && dataFound.length > 1) {
        const totalWeight = dataFound.reduce(
          (acc: WasteData, item: WasteData) => {
            return {
              ...acc,
              weight: acc.weight + item.weight,
            };
          },
          { year: "", monthName: "", material: "", weight: 0 }
        );
        return totalWeight;
      } else if (dataFound) {
        return dataFound;
      } else {
        return { year: yearOne, monthName: monthOne, material: m, weight: 0 };
      }
    });
    const yearTwoData = chosenMaterial.map((m) => {
      const dataFound = dataUntouched.find((inputUntouchedData: any) => {
        return (
          inputUntouchedData.year === yearTwo &&
          inputUntouchedData.monthName === monthTwo &&
          inputUntouchedData.material === m
        );
      });
      if (dataFound && dataFound.length > 1) {
        const totalWeight = dataFound.reduce(
          (acc: WasteData, item: WasteData) => {
            return {
              ...acc,
              weight: acc.weight + item.weight,
            };
          },
          { year: "", monthName: "", material: "", weight: 0 }
        );
        return totalWeight;
      } else if (dataFound) {
        return dataFound;
      } else {
        return { year: yearTwo, monthName: monthTwo, material: m, weight: 0 };
      }
    });

    setDataState({
      labels: chosenMaterial,
      datasets: [
        {
          label: "UBCV: " + yearOne + " " + monthOne,
          data: yearOneData.map((m) => {
            return m.weight;
          }),
          borderColor: "#4bc0c0",
          backgroundColor: "#4bc0c0",
        },
        {
          label: "UBCV: " + yearTwo + " " + monthTwo,
          data: yearTwoData.map((m) => {
            return m.weight;
          }),
          borderColor: "#cc65fe",
          backgroundColor: "#cc65fe",
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
    console.log(e.target.value);
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
      <MultipleYearCompare
        setYearOne={setYearOne}
        year={year}
        setYearTwo={setYearTwo}
        setMaterial={setMaterial}
        material={material}
        handleSubmit={handleSubmit}
        setMonthTwo={setMonthTwo}
        setMonthOne={setMonthOne}
        yearOne={yearOne}
        yearTwo={yearTwo}
        monthOne={monthOne}
        monthTwo={monthTwo}
        months={[...months]}
        onChange={handleMaterialChange}
        chosenArray={chosenMaterial}
      />
      {showGraph && <BarChart chartData={dataState} />}
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

  console.log(dataUntouched);

  return {
    props: {
      dataUntouched: dataUntouched,
      transformedData: transformedData,
      years: Array.from(years),
      months: Array.from(months),
    },
  };
}

// let yearOneSum = [0]
// let yearOneLabel = chosenMaterial.map((materialMap) => {
//   yearOneSum = dataUntouched
//   .filter(
//     (m: any) =>
//     yearOne == m.year &&
//     materialMap == m.material
//     ).map((m: any) => {
//       return  m.weight;
//     });
//     return `${formData.yearOne} for ${materialMap}`
//   })

//   let yearTwoSum = [0]
//   let yearTwoLabel = chosenMaterial.map((materialMap) => {
//   yearTwoSum = dataUntouched
//   .filter(
//     (m: any) =>
//     yearTwo == m.year &&
//     materialMap == m.material
//     ).map((m: any) => {
//       return  m.weight;
//     });
//     return `${formData.yearTwo} for ${materialMap}`
//   })
