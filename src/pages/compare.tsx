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

export default function Home({
  data,
  years,
  months,
  materials,
}: {
  data: data[];
  years: number[];
  materials: string[];
  months: string[];
}) {
  const [yearOne, setYearOne] = useState<string>("");
  const [yearTwo, setYearTwo] = useState<string>("");
  const [firstYearSum, setFirstYearSum] = useState<number>(0);
  const [secondYearSum, setSecondYearSum] = useState<number>(0);
  const [material, setMaterial] = useState<string[]>(materials);
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<any>({});
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [dataState, setDataState] = useState({} as ChartData);

  console.log("YEARS: ", years); // in the browser this logs as an array of strings and i have the type set as number[] (ask sam)

  useEffect(() => {
    setDataState({
      labels: [formData.yearOne, formData.yearTwo],
      datasets: [
        {
          label: "UBCV: " + formData.material,
          data: [firstYearSum / 100000 / 2, secondYearSum / 100000 / 2], // fix this...
          borderColor: "#ddeeef",
          backgroundColor: "#ddeeef",
        },
      ],
    });
  }, [formData, firstYearSum, secondYearSum]);

  console.log("formData", formData);
  console.log("dataset", dataState);

  const firstYear = useMemo(() => {
    return data.filter((data: any) => {
      if (year == formData.yearOne && material == formData.material) {
        return data;
      }
    });
  }, [formData]);

  const secondYear = useMemo(() => {
    return data.filter((data: any) => {
      if (year == formData.yearTwo && material == formData.material) {
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
        <div className="content-start m-12">
          <form action="#">
            <div className="flex  flex-col gap-3">
              <div className="flex mb-12  flex-col mb-12">
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

              <div className="flex mb-12  flex-col mb-12">
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

              <div className="flex mb-12  flex-col mb-12">
                <label htmlFor="materials">Material</label>
                <select
                  className="border-2 border-lime-600"
                  name="materials"
                  id="materials"
                  onChange={(e) => {
                    setMaterial([e.target.value]);
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

            {yearOne == "" || yearTwo == "" || material[0] == undefined ? ( // material isnt working here for this conditional
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
                <div className="flex mb-12  flex-col mb-12">
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

                <div className="flex mb-12  flex-col mb-12">
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

                <div className="flex mb-12  flex-col mb-12">
                  <label htmlFor="materials">Material</label>
                  <select
                    value={material}
                    className="border-2 border-lime-600"
                    name="materials"
                    id="materials"
                    onChange={(e) => {
                      setMaterial([e.target.value]);
                    }}
                  >
                    {[
                      "Containers",
                      "Mixed Paper",
                      "Office Paper",
                      "Refuse (ICI Waste)",
                      "Corrugated Cardboard",
                      "Transfer Station Landfill Garbage",
                    ].map((material: string) => {
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
