import LineChart from "@/components/chart/LineChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap"
import { utils } from "xlsx";
import { json } from "stream/consumers";


import type { ChartData, Datasets } from "@/types/LineChart";


type data = {
  Date: Date
  'Transfer Station Landfill Garbage (tonnes) (UBCV)': string
  'Containers (tonnes) (UBCV)': string
  'Corrugated Cardboard (tonnes) (UBCV)': string
  'Mixed Paper (tonnes) (UBCV)': string
  'Office Paper (tonnes) (UBCV)': string
  'Moisture Correction (tonnes) (UBCV)': string
  'Refuse (ICI Waste) (tonnes) (UBCV)': string
}

type FormData = {
  yearOne: string
  yearTwo: string
  material: string
}

export default function Home({ data, years }: {data: data[], years: number[]}) {
    const [yearOne, setYearOne] = useState("");
    const [yearTwo, setYearTwo] = useState("");
    const [firstYearTotals, setFirstYearTotals] = useState<number[]>([]);
    const [secondYearTotals, setSecondYearTotals] = useState<number[]>([]);
    const [material, setMaterial] = useState(["Containers (tonnes) (UBCV)", "Mixed Paper (tonnes) (UBCV)", "Office Paper (tonnes) (UBCV)", "Refuse (ICI Waste) (tonnes) (UBCV)", "Moisture Correction (tonnes) (UBCV)", "Corrugated Cardboard (tonnes) (UBCV)", "Transfer Station Landfill Garbage (tonnes) (UBCV)"]);
    const [chosenMaterial, setChosenMaterial] = useState<string>("");
    const [year, setYear] = useState<number[]>(years) 
    const [formData, setFormData] = useState<FormData>({
      yearOne: "",
      yearTwo: "",
      material: ""
    })
    const [showGraph, setShowGraph] = useState(false)
    const [dataState, setDataState] = useState<ChartData>({
      labels: [],
      datasets: []
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    useEffect(() => {
      setDataState({
        labels: months,
        datasets: [
          // FIRST DATASET
          {
          label: formData.yearOne,
          data: Object.entries(firstYearTotals).map(([month, total]) => ({
            month,total
          }
          )).sort((a, b) => a.month.localeCompare(b.month)).map((element) => {
            return element.total
          }),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        // SECOND DATASET
        {
          label: formData.yearTwo,
          data: Object.entries(secondYearTotals).map(([month, total]) => ({month,total}))
          .sort((a, b) => a.month.localeCompare(b.month)).map((element) => {
            return element.total
          }
          ),
          fill: false,
          borderColor: 'rgb(335, 2, 192)',
          tension: 0.1,
        }
      ],
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Weight (tonnes)'
            }
          }
        } 
    }

    }
    
    )
    }, [formData, firstYearTotals, secondYearTotals])

  

    useEffect(() => {
      // this useEffect is kinda ugly and im repeating myself and i kinda only wanna do the logic once but i dont know how to do that right now...
      console.log("FORM DATA: ", formData)
      const firstMonthlyTotals: any = { 
        '01': 0,
        '02': 0,
        '03': 0,
        '04': 0,
        '05': 0,
        '06': 0,
        '07': 0,
        '08': 0,
        '09': 0,
        '10': 0,
        '11': 0,
        '12': 0,
      };
    
    
    data.forEach((item: any) => {
        if (item.Date.startsWith(formData.yearOne)) {
          const month = item.Date.substring(5, 7); // extract the month from the date
          const weight = item[formData.material]; // get the weight for the desired material
          if (weight !== 'NA') {
            firstMonthlyTotals[month] += weight ; // add the weight to the monthly total for that month
          }
        }
      });
      setFirstYearTotals(firstMonthlyTotals)


      const secondMonthlyTotals: any = {
        '01': 0,
        '02': 0,
        '03': 0,
        '04': 0,
        '05': 0,
        '06': 0,
        '07': 0,
        '08': 0,
        '09': 0,
        '10': 0,
        '11': 0,
        '12': 0,
      };

      data.forEach((item: any) => {
        if (item.Date.startsWith(formData.yearTwo)) {
          const month = item.Date.substring(5, 7); // extract the month from the date
          const weight = item[formData.material]; // get the weight for the desired material
          if (weight !== 'NA') {
            secondMonthlyTotals[month] += weight; // add the weight to the monthly total for that month
          }
        }
      });
      setSecondYearTotals(secondMonthlyTotals)


    }, [formData])







  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(yearOne, yearTwo, chosenMaterial)
    setFormData({
      yearOne: +yearOne + "",
      yearTwo: +yearTwo + "",
      material: chosenMaterial
    })
    setShowGraph(true)
}



  return (
    <>     
    {!showGraph ? (


    <div className="content-start m-12">
        
    <form action="#">

<div className="flex  flex-col gap-3">

    <div className="flex mb-12  flex-col mb-12">
      <label htmlFor="yearOne" className="mt-0">Year One</label>
      <select className="border-2 border-lime-600" name="yearOne" id="yearOne" onChange={(e) => {setYearOne(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>


    <div className="flex mb-12  flex-col mb-12">
        <label htmlFor="yearTwo">Year Two</label>
      <select className="border-2 border-lime-600" name="yearTwo" id="yearTwo" onChange={(e) => {setYearTwo(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>
    

    <div className="flex mb-12  flex-col mb-12">
        <label htmlFor="materials">Material</label>
      <select className="border-2 border-lime-600" name="materials" id="materials" onChange={(e) => {setChosenMaterial(e.target.value)}}>
        {material.map((material: string) => {
            return <option key={material} value={material}>{material}</option>;
        })}
      </select>
    </div>



</div>


      <p>
        <button 
        type="submit" 
        onClick={handleSubmit}
        className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
        Compare
        </button>
      </p>

      </form>
    </div>
    ) : (
<> 
        <div className="content-start m-12">
        
    <form action="#">

<div className="flex  flex-col gap-3">

    <div className="flex mb-12  flex-col mb-12">
      <label htmlFor="yearOne" className="mt-0">Year One</label>
      <select value={yearOne} className="border-2 border-lime-600" name="yearOne" id="yearOne" onChange={(e) => {setYearOne(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>


    <div className="flex mb-12  flex-col mb-12">
        <label htmlFor="yearTwo">Year Two</label>
      <select value={yearTwo} className="border-2 border-lime-600" name="yearTwo" id="yearTwo" onChange={(e) => {setYearTwo(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>
    

    <div className="flex mb-12  flex-col mb-12">
        <label htmlFor="materials">Material</label>
      <select value={material} className="border-2 border-lime-600" name="materials" id="materials" onChange={(e) => {setChosenMaterial(e.target.value)}}>
        {material.map((material: string) => {
            return <option key={material} value={material}>{material}</option>;
        })}
      </select>
    </div>



</div>


      <p>
        <button 
        type="submit" 
        onClick={handleSubmit}
        className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full">
        Compare
        </button>
      </p>

      </form>
    </div>
       <LineChart chartData={dataState} />
    </>
    )}
    </>
  )
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
    if (key !== 'Date' && m[key] !== 'NA') {
      const material = key.replace(' (tonnes) (UBCV)', '');
      const weight = m[key];
      transformedData.push({ year, material, weight });
    }
  });
});

  const years = transformedData.reduce((acc: Set<number>, category: any) => {
    acc.add(category.year)
    return acc
    }, new Set<number>())

    
  return {
    props: {
      transformedData: transformedData,
      years: Array.from(years),
      data: jsonArrayFromBackendJSON.jsonArray,
    },
  };
}
