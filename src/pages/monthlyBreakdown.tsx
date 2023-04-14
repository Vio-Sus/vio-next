import LineChart from "@/components/chart/LineChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap";
import { utils } from "xlsx";
import { json } from "stream/consumers";

import type { ChartData, Datasets } from "@/types/LineChart";

type entries = {
  weight: Number;
  waste: string;
  date: Date;
};

type FormData = {
  yearOne: string;
  yearTwo: string;
  material: string;
};

export default function Home({
  entries,
  years,
  materials,
}: {
  entries: entries[];
  years: number[];
  materials: string[];
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
    console.log("MADE IT HERE 2");
    // this useEffect is kinda ugly and im repeating myself and i kinda only wanna do the logic once but i dont know how to do that right now...
    console.log("FORM DATA: ", formData);
    let firstMonthlyTotals: any = {
      "01": 0,
      "02": 0,
      "03": 0,
      "04": 0,
      "05": 0,
      "06": 0,
      "07": 0,
      "08": 0,
      "09": 0,
      "10": 0,
      "11": 0,
      "12": 0,
    };

    entries.map((m: any) => {
      if (m.year == formData.yearOne && m.waste == formData.material) {
        let month = m.month;
        let weight = m.weight;
        if (weight > 0) {
          firstMonthlyTotals[month] += weight; // / 10000; // convert to tonnes
        }
      }
    });
    setFirstYearTotals(firstMonthlyTotals);
    console.log("FIRST MONTHLY TOTALS: ", firstMonthlyTotals);

    let secondMonthlyTotals: any = {
      "01": 0,
      "02": 0,
      "03": 0,
      "04": 0,
      "05": 0,
      "06": 0,
      "07": 0,
      "08": 0,
      "09": 0,
      "10": 0,
      "11": 0,
      "12": 0,
    };

    entries.map((m: any) => {
      if (m.year == formData.yearTwo && m.waste == formData.material) {
        let month = m.month;
        let weight = m.weight;
        if (weight > 0) {
          secondMonthlyTotals[month] += weight; // / 10000; // convert to tonnes
        }
      }
    });
    setSecondYearTotals(secondMonthlyTotals);
    console.log("FIRST MONTHLY TOTALS: ", firstMonthlyTotals);
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
  const entriesRaw = await prisma.entry.findMany({});
  const entries = entriesRaw.map((entry: any) => {
    return {
      date: entry.date.toISOString(),
      waste: entry.waste,
      weight: entry.weight,
      year: new Date(entry.date).getFullYear(),
      month: entry.date.toISOString().substring(5, 7),
    };
  });
  // console.log(entries);

  // get unique years
  const years = entries.map((entry: any) => {
    return new Date(entry.date).getFullYear();
  });
  const year = [...new Set(years)];

  // get unique materials
  const materials = entries.map((entry: any) => {
    return entry.waste;
  });
  const material = [...new Set(materials)];

  return {
    props: {
      entries,
      years: Array.from(year),
      materials: Array.from(material),
    },
  };
}
