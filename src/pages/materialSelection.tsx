import BarChart from "@/components/chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";

import type { ChartData, Datasets } from "@/types/BarChart";

type data = {
  id: Number;
  collaborator: string;
  created_at: Date;
  updated_at: Date;
  weight: Number;
  waste: string;
  date: Date;
  user_id: String;
  company_id: Number;
  site: String;
};

type FormData = {
  yearOne: string;
  yearTwo: string;
  material: string;
};

export default function Home({
  data,
  years,
  materials,
  months,
}: {
  data: data[];
  years: number[];
  materials: string[];
  months: string[];
}) {
  const [yearOne, setYearOne] = useState("");
  const [yearTwo, setYearTwo] = useState("");
  const [firstYearTotals, setFirstYearTotals] = useState<number[]>([]);
  const [secondYearTotals, setSecondYearTotals] = useState<number[]>([]);
  const [material, setMaterial] = useState<string[]>(materials);
  const [chosenMaterial, setChosenMaterial] = useState<any>([]);
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<FormData>({
    yearOne: "",
    yearTwo: "",
    material: "",
  });
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [chosenMaterialsSum, setChosenMaterialsSum] = useState<any>([]);
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  console.log("DATA: ", data);

  useEffect(() => {
    setDataState({
      // list of months
      labels: [
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
      ],
      datasets: chosenMaterial.map((material: string, index: number) => {
        const colors = ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0"];
        return {
          label: material,
          data: getMonthlyBreakdown(formData.yearOne, material),
          borderColor: colors[index % colors.length],
          backgroundColor: colors[index % colors.length],
        };
      }),
    });
  }, [formData, firstYearTotals, secondYearTotals]);

  function getMonthlyBreakdown(year: string, material: string) {
    let monthsOfYear: any = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    // {
    //   year: '2021',
    //   monthName: 'April',
    //   material: 'Mixed Paper',
    //   weight: 1070
    // },

    data.map((m: any) => {
      if (m.year == year && m.material == material) {
        let month = m.monthName;
        let weight = m.weight;
        if (weight !== "NA" || weight < 0) {
          monthsOfYear[month] += m.weight / 10000; // convert to tonnes
        }
      }
    });

    // data.map((m: any) => {
    //   if (m.year == year) {
    //     let month = m.monthName;
    //     let weight = m.weight;
    //     if (weight !== "NA" || weight < 0) {
    //       monthsOfYear[month] += m.weight / 1000000; // convert to tonnes
    //     }
    //   }
    // });

    let sortedMonths = Object.entries(monthsOfYear)
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((element) => {
        return element.total;
      });
    console.log("SORTED MONTHS: ", sortedMonths);
    return sortedMonths;
  }

  useEffect(() => {
    let materialsSum = chosenMaterial.map((material: string) => {
      console.log("material", material);
      return getMonthlyBreakdown(formData.yearOne, material);
    });
    setChosenMaterialsSum(materialsSum);
  }, [formData]);

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChosenMaterial([...chosenMaterial, e.target.value]);
    } else {
      setChosenMaterial((prevMaterials: string[]) =>
        prevMaterials.filter((m) => m !== e.target.value)
      );
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setChosenMaterial([])
    console.log(yearOne, yearTwo, material[0]);
    setFormData({
      yearOne: +yearOne + "",
      yearTwo: +yearTwo + "",
      material: chosenMaterial,
    });
    setShowGraph(true);
  };

  return (
    <>
      {!showGraph ? (
        <div className="content-start m-12">
          <form action="#">
            <div className="flex  flex-col gap-3">
              <div className="flex  flex-col mb-12">
                <label htmlFor="yearOne" className="mt-0">
                  Pick year
                </label>
                <select
                  className="border-2 border-lime-600"
                  name="yearOne"
                  id="yearOne"
                  onChange={(e) => {
                    setYearOne(e.target.value);
                  }}
                >
                  <option value="">Select a year</option>
                  {year.map((year: number) => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex  flex-col mb-12">
                <span>Material</span>
                {material.map((material: string) => (
                  <div key={material} className="flex items-center">
                    <input
                      type="checkbox"
                      name="materials"
                      id={material}
                      value={material}
                      onChange={handleMaterialChange}
                    />
                    <label htmlFor={material} className="ml-2">
                      {material}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {chosenMaterial == "" || yearOne == "" ? (
              <p>
                <button
                  disabled={true}
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-block px-7 py-3 bg-[#808080] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Compare
                </button>
              </p>
            ) : (
              <p>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Compare
                </button>
              </p>
            )}
          </form>
        </div>
      ) : (
        <>
          <div className="content-start m-12">
            <form action="#">
              <div className="flex  flex-col gap-3">
                <div className="flex flex-col mb-12">
                  <label htmlFor="yearOne" className="mt-0">
                    Year One
                  </label>
                  <select
                    value={yearOne}
                    className="border-2 border-lime-600"
                    name="yearOne"
                    id="yearOne"
                    onChange={(e) => {
                      setYearOne(e.target.value);
                    }}
                  >
                    {year.map((year: number) => {
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex flex-col mb-12">
                  <span>Material</span>
                  {material.map((material: string) => (
                    <div key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        name="materials"
                        id={material}
                        value={material}
                        defaultChecked={chosenMaterial.includes(material)}
                        onChange={handleMaterialChange}
                      />
                      <label htmlFor={material} className="ml-2">
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                >
                  Compare
                </button>
              </p>
            </form>
          </div>
          <BarChart chartData={dataState} />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const allEntries = await prisma.entry.findMany({});

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

  const materials = transformedData.reduce(
    (acc: Set<string>, category: any) => {
      acc.add(category.material);
      console.log("something to write here", acc);
      return acc;
    },
    new Set<string>()
  );
  console.log("materials", materials);

  const years = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.year);
    return acc;
  }, new Set<number>());
  console.log("years", years);

  const months = dataUntouched.reduce((acc: Set<number>, category: any) => {
    acc.add(category.monthName);
    return acc;
  }, new Set<number>());

  console.log("months", months);
  console.log("dataUntouched", dataUntouched);
  console.log("transformedData", transformedData);

  return {
    props: {
      data: dataUntouched,
      // data: transformedData,
      years: Array.from(years),
      months: Array.from(months),
      materials: Array.from(materials),
    },
  };
}
