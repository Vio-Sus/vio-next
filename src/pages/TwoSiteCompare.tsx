import LineChart from "@/components/chart/LineChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap";
import { utils } from "xlsx";
import { json } from "stream/consumers";

import type { ChartData, Datasets } from "@/types/LineChart";
import { SiteListForm } from "@/components/account";

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
  siteOne: string;
  siteTwo: string;
  material: string;
};

export default function Home({
  data,
  years,
  // months,
  materials,
  uniqueSites,
  waste,
  uniqueWaste,
}: {
  data: data[];
  years: number[];
  materials: string[];
  months: string[];
  uniqueSites: string[];
  waste: any;
  uniqueWaste: any;
}) {
  const [siteOne, setSiteOne] = useState("");
  const [siteTwo, setSiteTwo] = useState("");
  const [materialForSiteOne, setMaterialForSiteOne] = useState<any>([]);
  const [materialForSiteTwo, setMaterialForSiteTwo] = useState<any>([]);
  const [material, setMaterial] = useState(materials);
  const [chosenMaterial, setChosenMaterial] = useState<string>("");
  const [year, setYear] = useState<number[]>(years);
  const [formData, setFormData] = useState<FormData>({
    siteOne: "",
    siteTwo: "",
    material: "",
  });
  const [showGraph, setShowGraph] = useState(false);
  const [dataState, setDataState] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  console.log("MATERAL FOR SITE ONE", materialForSiteOne);
  console.log("MATERAL FOR SITE TWO", materialForSiteTwo);

  useEffect(() => {
    setDataState({
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
      datasets: [
        // FIRST DATASET
        {
          label: formData.siteOne,
          data: materialForSiteOne,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        // SECOND DATASET
        {
          label: formData.siteTwo,
          data: materialForSiteTwo,
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
  }, [materialForSiteOne, materialForSiteTwo]);

  useEffect(() => {
    if (formData.siteOne && formData.siteTwo && formData.material) {
      const materialForSite = (site: string) =>
        data.filter(
          (item: any) => item.site === site && item.waste === formData.material
        );

      const materialForFirstSite = materialForSite(formData.siteOne);
      const materialForSecondSite = materialForSite(formData.siteTwo);

      // reduce the data to get the total weight for each month i should get an array of 12 numbers
      const totalWeightForSite = (site: any) => {
        const totalWeight = site.reduce((acc: any, item: any) => {
          const month = new Date(item.date).getMonth();
          acc[month] = acc[month] ? acc[month] + item.weight : item.weight;
          return acc;
        }, Array(12).fill(0)); // initialize the accumulator as an array of 12 zeros
        return totalWeight;
      };

      const totalWeightForFirstSite = totalWeightForSite(materialForFirstSite);
      const totalWeightForSecondSite = totalWeightForSite(
        materialForSecondSite
      );

      setMaterialForSiteOne(totalWeightForFirstSite);
      setMaterialForSiteTwo(totalWeightForSecondSite);

      console.log("materialForFirstSite", materialForFirstSite);
      console.log("materialForSecondSite", materialForSecondSite);
    }
  }, [formData]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(siteOne, siteTwo, chosenMaterial);
    setFormData({
      siteOne: siteOne,
      siteTwo: siteTwo,
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
                <label htmlFor="siteOne" className="mt-0">
                  Site One
                </label>
                <select
                  className="border-2 border-lime-600"
                  name="siteOne"
                  id="siteOne"
                  onChange={(e) => {
                    setSiteOne(e.target.value);
                  }}
                >
                  <option value="">Select a Site</option>

                  {uniqueSites.map((site: string) => {
                    return (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex  flex-col mb-12">
                <label htmlFor="siteTwo">Site Two</label>
                <select
                  className="border-2 border-lime-600"
                  name="siteTwo"
                  id="siteTwo"
                  onChange={(e) => {
                    setSiteTwo(e.target.value);
                  }}
                >
                  <option value="">Select a Site</option>
                  {uniqueSites.map((site: string) => {
                    return (
                      <option key={site} value={site}>
                        {site}
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
                  {uniqueWaste.map((material: string) => {
                    return (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {chosenMaterial == "" || siteOne == "" || siteTwo == "" ? (
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
                  <label htmlFor="siteOne" className="mt-0">
                    Site One
                  </label>
                  <select
                    value={siteOne}
                    className="border-2 border-lime-600"
                    name="siteOne"
                    id="siteOne"
                    onChange={(e) => {
                      setSiteOne(e.target.value);
                    }}
                  >
                    {uniqueSites.map((site: string) => {
                      return (
                        <option key={site} value={site}>
                          {site}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex  flex-col mb-12">
                  <label htmlFor="siteTwo">Site Two</label>
                  <select
                    value={siteTwo}
                    className="border-2 border-lime-600"
                    name="siteTwo"
                    id="siteTwo"
                    onChange={(e) => {
                      setSiteTwo(e.target.value);
                    }}
                  >
                    {uniqueSites.map((site: string) => {
                      return (
                        <option key={site} value={site}>
                          {site}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex   flex-col mb-12">
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
                    {uniqueWaste.map((material: string) => {
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
  console.log("ALL ENTRIES: ", allEntries);

  let waste = allEntries.map((entry) => entry.waste);
  console.log("WASTE: ", waste);

  let uniqueSites: string[] = [];
  const sites = allEntries.map((entry) => entry.site);
  sites.forEach((site) => {
    if (!uniqueSites.includes(site)) {
      uniqueSites.push(site);
    }
  });

  let uniqueWaste: string[] = [];
  waste.forEach((waste) => {
    if (!uniqueWaste.includes(waste)) {
      uniqueWaste.push(waste);
    }
  });

  const data = allEntries.map((entry) => {
    return {
      ...entry,
      created_at: entry.created_at.toISOString(),
      updated_at: entry.updated_at.toISOString(),
      date: entry.date.toISOString(),
    };
  });

  return {
    props: {
      uniqueSites,
      waste,
      uniqueWaste,
      data,
    },
  };
}
