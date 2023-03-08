import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/chart/BarChart";
import { prisma } from "../../server/db/client";
import ButtonAddYearAndMonth from "@/components/button/ButtonPrimary";
import MultipleYearCompare from "@/components/compareMonthComponents/TwoYearsAndTwoMonths";
import PickYearAndMonth from "@/components/input/PickYearAndMonth";
import type { ChartData, Datasets } from "@/types/BarChart";

type WasteData = {
  year: string;
  monthName: string;
  material: string;
  weight: number;
};

export default function Home({
  transformedData,
  years,
  months,
  dataUntouched,
}: any) {
  const [monthOne, setMonthOne] = useState<string>("January");
  const [monthTwo, setMonthTwo] = useState<string>("January");
  const [yearOne, setYearOne] = useState<string>("2012");
  const [yearTwo, setYearTwo] = useState<string>("2012");
  const [extraYearsArray, setExtraYearsArray] = useState<string[]>([]);
  const [extraMonthsArray, setExtraMonthsArray] = useState<string[]>([]);
  const [howManyExtraDateInputs, setHowManyExtraDateInputs] = useState(1);
  const [arrayOfExtraDateInputs, setArrayOfExtraDateInputs] = useState<
    React.ReactNode[]
  >([]);
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
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

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
    setFormData({
      yearOne: +yearOne,
      yearTwo: +yearTwo,
      material: material[0],
    });
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

  async function handleAddYearAndMonthComponent() {
    let valuesYearAndMonth = ["2012", "January"];
    let howManyNewInputs = howManyExtraDateInputs;
    const extraYearsArrayPlusOne = [...extraYearsArray, valuesYearAndMonth[0]];
    const extraMonthsArrayPlusOne = [
      ...extraMonthsArray,
      valuesYearAndMonth[1],
    ];
    setExtraMonthsArray(extraMonthsArrayPlusOne);
    setExtraYearsArray(extraYearsArrayPlusOne);
    const indexOfThisYear = extraYearsArrayPlusOne.length - 1;
    const indexOfThisMonth = extraMonthsArrayPlusOne.length - 1;
    const allTheExistingExtraComponents = [
      ...arrayOfExtraDateInputs,
      <PickYearAndMonth
        year={year}
        yearOne={extraYearsArray[indexOfThisYear]}
        setYearOne={(input) => {
          setExtraYearsArray((extraYearsArrayPlusOne) =>
            extraYearsArrayPlusOne.map((m, i) => {
              if (i == indexOfThisMonth) {
                m = input;
              }
              return m;
            })
          );
        }}
        idAndNameYear={"year" + (2 + howManyNewInputs)}
        labelNameYear={"year " + (2 + howManyNewInputs)}
        months={months}
        monthOne={extraMonthsArray[indexOfThisMonth]}
        setMonthOne={(input) => {
          setExtraMonthsArray((extraMonthsArrayPlusOne) =>
            extraMonthsArrayPlusOne.map((m, i) => {
              if (i == indexOfThisMonth) {
                m = input;
              }
              return m;
            })
          );
        }}
        idAndNameMonth={"month" + (2 + howManyNewInputs)}
        labelNameMonth={"The Month For Year " + (2 + howManyNewInputs)}
      />,
    ];
    setArrayOfExtraDateInputs(allTheExistingExtraComponents);
    setHowManyExtraDateInputs(howManyNewInputs + 1);
  }

  console.log(extraMonthsArray, extraYearsArray, arrayOfExtraDateInputs);

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
        arrayOfExtraInputs={arrayOfExtraDateInputs}
      />
      <ButtonAddYearAndMonth
        children="Add Year And Month"
        onClick={handleAddYearAndMonthComponent}
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

  // console.log(dataUntouched);

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
