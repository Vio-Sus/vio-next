import { useEffect, useMemo, useState } from "react";
import BarChart from "@/components/chart/BarChart";
import { prisma } from "../../../server/db/client";
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
  materials
}: any) {
  const [monthOne, setMonthOne] = useState<string>(months[0]);
  const [monthTwo, setMonthTwo] = useState<string>(months[0]);
  const [yearOne, setYearOne] = useState<string>(years[0]);
  const [yearTwo, setYearTwo] = useState<string>(years[0]);
  const [extraYearsArray, setExtraYearsArray] = useState<string[]>([]);
  const [extraMonthsArray, setExtraMonthsArray] = useState<string[]>([]);
  const [howManyExtraDateInputs, setHowManyExtraDateInputs] = useState(1);
  const [arrayOfExtraDateInputs, setArrayOfExtraDateInputs] = useState<
    React.ReactNode[]
  >([]);
  const [firstYearSum, setFirstYearSum] = useState<number>(0);
  const [secondYearSum, setSecondYearSum] = useState<number>(0);
  const [chosenMaterial, setChosenMaterial] = useState<string[]>([]);

  const [material, setMaterial] = useState<string[]>(materials);
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<any>({});
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const allYears = [yearOne, yearTwo, ...extraYearsArray];
    const allMonths = [monthOne, monthTwo, ...extraMonthsArray];
    const allYearsWithData = allYears.map((m: string | string[], i) => {
      let dataForTheseMaterials;
      dataForTheseMaterials = chosenMaterial.map((material) => {
        const dataFound = dataUntouched.find((inputUntouchedData: any) => {
          return (
            inputUntouchedData.year === m &&
            inputUntouchedData.monthName === allMonths[i] &&
            inputUntouchedData.material === material
          );
        });
        console.log(dataFound)
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
          return {
            year: m,
            monthName: allMonths[i],
            material: material,
            weight: 0,
          };
        }
      });

      return dataForTheseMaterials;
    });

    console.log(allYearsWithData);
    let dataSetsArray;
    if (allYearsWithData[0].length > 0) {
      dataSetsArray = allYearsWithData.map((m, i) => {
        // console.log(m)
        let RanHexCol = (Math.random() * 16777215).toString(16);
        let randomColor = "#" + RanHexCol.slice(0, 6);
        return {
          label: "UBCV: " + m[0].year + " " + m[0].monthName,
          data: m.map((m) => {
            return m.weight;
          }),
          borderColor: randomColor,
          backgroundColor: randomColor,
        };
      });

      console.log(dataSetsArray);

      setDataState({
        labels: chosenMaterial,
        datasets: [...dataSetsArray],
      });
    }
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
    let valuesYearAndMonth = [years[0], months[0]];
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

  // console.log(extraMonthsArray, extraYearsArray, arrayOfExtraDateInputs);

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

export async function getServerSideProps(context: any) {


  const allEntries = await prisma.entry.findMany({})

  // console.log(allEntries)

    
    let transformedData: any = [];
    allEntries.map((m) => {
        const year = new Date(m.date).getFullYear().toString();
        Object.keys(m).forEach((key) => {
          // console.log(key)
          if (key !== "Date") {
            const material = m.waste;
            const weight = m.weight * 1000;
            transformedData.push({ year, material, weight });
          }
        });
    });
    // console.log(transformedData);
    
    let dataUntouched: (string | number | any)[] = [];
    allEntries.map((m) => {  
        const month = new Date(m.date).getUTCMonth().toString();
        const year = new Date(m.date).getFullYear().toString();
        Object.keys(m).forEach((key) => {
          // if (m[key] == "NA") m[key] = 0;
          if (key !== "Date") {
            const material = m.waste;
            const weight: number | string = m.weight * 1000;
            const monthName: string = new Date(
              2000,
              parseInt(month)
              ).toLocaleString("default", { month: "long" });
              // console.log(monthName, material, weight, year)
              dataUntouched.push({ year, monthName, material, weight });
            }
          });
      });
      // console.log(dataUntouched);
      
  
  

  const materials = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.material);
    return acc;
  }, new Set<number>());

  const years = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.year);
    return acc;
  }, new Set<number>());

  const months = dataUntouched.reduce((acc: Set<number>, category: any) => {
    acc.add(category.monthName);
    return acc;
  }, new Set<number>());

  console.log(dataUntouched.length);

  return {
    props: {
      dataUntouched: dataUntouched,
      transformedData: transformedData,
      years: Array.from(years),
      months: Array.from(months),
      materials: Array.from(materials)
    },
  };
}
