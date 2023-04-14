import BarChart from "@/components/chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";

import type { ChartData, Datasets } from "@/types/BarChart";

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
  const [firstYearSum, setFirstYearSum] = useState<number>(0);
  const [secondYearSum, setSecondYearSum] = useState<number>(0);
  const [material, setMaterial] = useState<string[]>(materials);
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<FormData>({
    yearOne: "",
    yearTwo: "",
    material: "",
  });

  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  // console.log("HERE HERE HERE: ", firstYearSum, secondYearSum);

  useEffect(() => {
    setDataState({
      labels: [formData.yearOne, formData.yearTwo],
      datasets: [
        {
          label: "UBCV: " + formData.material,
          data: [firstYearSum / 0.90718, secondYearSum / 0.90718],
          borderColor: "#ddeeef",
          backgroundColor: "#ddeeef",
        },
      ],
    });
  }, [formData, firstYearSum, secondYearSum]);

  const firstYear = useMemo(() => {
    return entries.filter((data: any) => {
      if (+data.year == +formData.yearOne && data.waste == formData.material) {
        // console.log("DATA FROM YEAR ONE", data);
        return data;
      }
    });
  }, [formData]);
  // console.log("FIRST YEAR", firstYear);

  const secondYear = useMemo(() => {
    return entries.filter((data: any) => {
      if (+data.year == +formData.yearTwo && data.waste == formData.material) {
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
      yearOne: yearOne,
      yearTwo: yearTwo,
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
              <div className="flex  flex-col mb-12">
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

              <div className="flex   flex-col mb-12">
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

              <div className="flex  flex-col mb-12">
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
                  {materials.map((material: string) => {
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
                <div className="flex   flex-col mb-12">
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

                <div className="flex   flex-col mb-12">
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
                      setMaterial([e.target.value]);
                    }}
                  >
                    {materials.map((material: string) => {
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
  const entriesRaw = await prisma.entry.findMany({});
  const entries = entriesRaw.map((entry: any) => {
    return {
      date: entry.date.toISOString(),
      waste: entry.waste,
      weight: entry.weight,
      year: new Date(entry.date).getFullYear(),
    };
  });

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
