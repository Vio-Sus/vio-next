import LineChart from "@/components/chart/LineChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap";
import { utils } from "xlsx";
import { json } from "stream/consumers";

import type { ChartData, Datasets } from "@/types/LineChart";

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
  // months,
  materials,
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
  const [material, setMaterial] = useState(materials);
  const [chosenMaterial, setChosenMaterial] = useState<string>("");
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<FormData>({
    yearOne: "",
    yearTwo: "",
    material: "",
  });
  const [showGraph, setShowGraph] = useState(false);
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

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

  useEffect(() => {
    setDataState({
      labels: months,
      datasets: [
        // FIRST DATASET
        {
          label: formData.yearOne,
          data: Object.entries(firstYearTotals)
            .map(([month, total]) => ({
              month,
              total,
            }))
            .sort((a, b) => a.month.localeCompare(b.month))
            .map((element) => {
              return element.total;
            }),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        // SECOND DATASET
        {
          label: formData.yearTwo,
          data: Object.entries(secondYearTotals)
            .map(([month, total]) => ({ month, total }))
            .sort((a, b) => a.month.localeCompare(b.month))
            .map((element) => {
              return element.total;
            }),
          fill: false,
          borderColor: "rgb(335, 2, 192)",
          tension: 0.1,
        },
      ],
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Weight (tonnes)",
            },
          },
        },
      },
    });
  }, [formData, firstYearTotals, secondYearTotals]);

  useEffect(() => {
    // this useEffect is kinda ugly and im repeating myself and i kinda only wanna do the logic once but i dont know how to do that right now...
    console.log("FORM DATA: ", formData);
    let firstMonthlyTotals: any = {
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

    data.map((m: any) => {
      if (m.year == year && m.material == material) {
        let month = m.monthName;
        let weight = m.weight;
        if (weight !== "NA" || weight < 0) {
          firstMonthlyTotals[month] += m.weight / 10000; // convert to tonnes
        }
      }
    });
    setFirstYearTotals(firstMonthlyTotals);

    let secondMonthlyTotals: any = {
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

    data.map((m: any) => {
      if (m.year == year && m.material == material) {
        let month = m.monthName;
        let weight = m.weight;
        if (weight !== "NA" || weight < 0) {
          secondMonthlyTotals[month] += m.weight / 10000; // convert to tonnes
        }
      }
    });
    setSecondYearTotals(secondMonthlyTotals);
  }, [formData]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(yearOne, yearTwo, chosenMaterial);
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
              <div className="flex flex-col mb-12">
                <label htmlFor="yearOne" className="mt-0">
                  Year One
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
                <label htmlFor="yearTwo">Year Two</label>
                <select
                  className="border-2 border-lime-600"
                  name="yearTwo"
                  id="yearTwo"
                  onChange={(e) => {
                    setYearTwo(e.target.value);
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

              <div className="flex   flex-col mb-12">
                <label htmlFor="materials">Material</label>
                <select
                  className="border-2 border-lime-600"
                  name="materials"
                  id="materials"
                  onChange={(e) => {
                    setChosenMaterial(e.target.value);
                  }}
                >
                  <option value="">Select material</option>
                  {material.map((material: string) => {
                    return (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {chosenMaterial == "" || yearOne == "" || yearTwo == "" ? (
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

                <div className="flex  flex-col mb-12">
                  <label htmlFor="yearTwo">Year Two</label>
                  <select
                    value={yearTwo}
                    className="border-2 border-lime-600"
                    name="yearTwo"
                    id="yearTwo"
                    onChange={(e) => {
                      setYearTwo(e.target.value);
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

                <div className="flex  flex-col mb-12">
                  <label htmlFor="materials">Material</label>
                  <select
                    value={material}
                    className="border-2 border-lime-600"
                    name="materials"
                    id="materials"
                    onChange={(e) => {
                      setChosenMaterial(e.target.value);
                    }}
                  >
                    {material.map((material: string) => {
                      return (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      );
                    })}
                  </select>
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
          <LineChart chartData={dataState} />
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
    (acc: Set<number>, category: any) => {
      acc.add(category.material);
      return acc;
    },
    new Set<number>()
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
