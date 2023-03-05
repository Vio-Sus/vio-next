import BarChart from "@/components/chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";

import type { ChartData, Datasets } from "@/types/BarChart";

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

type transformedData = {
  year: string
  material: string
  weight: number 
 }

  

export default function Home({ data, years }: {data: data[], years: number[]}) {
    const [yearOne, setYearOne] = useState("");
    const [yearTwo, setYearTwo] = useState("");
    const [firstYearTotals, setFirstYearTotals] = useState<number[]>([]);
    const [secondYearTotals, setSecondYearTotals] = useState<number[]>([]);
    const [material, setMaterial] = useState<string[]>(["Containers (tonnes) (UBCV)", "Mixed Paper (tonnes) (UBCV)", "Office Paper (tonnes) (UBCV)", "Refuse (ICI Waste) (tonnes) (UBCV)", "Corrugated Cardboard (tonnes) (UBCV)", "Transfer Station Landfill Garbage (tonnes) (UBCV)"]);
    const [chosenMaterial, setChosenMaterial] = useState<any>([])
    const [year, setYear] = useState<number[]>(years) 
    const [formData, setFormData] = useState<FormData>({
      yearOne: "",
      yearTwo: "",
      material: ""
    })
    const [showGraph, setShowGraph] = useState<boolean>(false)
    const [chosenMaterialsSum, setChosenMaterialsSum] = useState<any>([])
    const [dataState, setDataState] = useState<ChartData>({
      labels: [],
      datasets: []
    });
  
    
    useEffect(() => {
      setDataState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: chosenMaterial.map((material: string, index: number) => {
        const colors = ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0']
          return {
                    label: "UBCV: " + material,
                    data: getMonthlyBreakdown(formData.yearOne, material),
                    borderColor: colors[index % colors.length],
                    backgroundColor: colors[index % colors.length],
            };
            }),
        }
      )
  }, [formData, firstYearTotals, secondYearTotals])


function getMonthlyBreakdown(year: string, material: string) {
    let monthsOfYear: any = {
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
    }
      
    data.map((m: any) => {
        if(m.Date.startsWith(year)){
        let month = m.Date.substring(5, 7);
        let weight = m[material];
        if(weight !== "NA" || weight < 0) {
            monthsOfYear[month] += weight;
          }
        }
     });

    let sortedMonths = Object.entries(monthsOfYear).map(([month, total]) => ({month,total}))
    .sort((a, b) => a.month.localeCompare(b.month)).map((element) => {
        return element.total
    });
    return sortedMonths
}






useEffect(() => {
   let materialsSum =  chosenMaterial.map((material: string) => {
        console.log("material", material)
        return getMonthlyBreakdown(formData.yearOne, material)
    })    
    setChosenMaterialsSum(materialsSum)
}, [formData])
        



const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setChosenMaterial([...chosenMaterial, e.target.value]);
    } else {
        setChosenMaterial((prevMaterials: string[]) => prevMaterials.filter(m => m !== e.target.value));
    }
  };
      
    

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // setChosenMaterial([])
    console.log(yearOne, yearTwo, material[0])
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
      <label htmlFor="yearOne" className="mt-0">Pick year</label>
      <select className="border-2 border-lime-600" name="yearOne" id="yearOne" onChange={(e) => {setYearOne(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
        })}
      </select>
    </div>


    
    <div className="flex mb-12  flex-col mb-12">
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
      <label htmlFor={material} className="ml-2">{material}</label>
    </div>
  ))}
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

    <div className="flex flex-col mb-12">
      <label htmlFor="yearOne" className="mt-0">Year One</label>
      <select value={yearOne} className="border-2 border-lime-600" name="yearOne" id="yearOne" onChange={(e) => {setYearOne(e.target.value)}}>
        {year.map((year: number) => {
            return <option key={year} value={year}>{year}</option>;
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
        onChange={handleMaterialChange}    
      />
      <label htmlFor={material} className="ml-2">{material}</label>
    </div>
  ))}
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
       <BarChart chartData={dataState} />
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

  console.log("jsonArrayFromBackendJSON",  jsonArrayFromBackendJSON.jsonArray)


  const transformedData: transformedData[] = [];
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
