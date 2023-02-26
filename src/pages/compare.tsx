import BarChart from "@/components/chart/BarChart";
import { useEffect, useMemo, useState } from "react";
import { prisma } from "../../server/db/client";
import Button from "@/components/button/ButtonMap"


export interface ChartData {
  labels: string[];
  datasets: Datasets[];
}
export type Datasets = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export default function Home({ transformedData, years }: any) {
    const [yearOne, setYearOne] = useState<string>("");
    const [yearTwo, setYearTwo] = useState<string>("");
    const [firstYearSum, setFirstYearSum] = useState<number>(0);
    const [secondYearSum, setSecondYearSum] = useState<number>(0);
    const [material, setMaterial] = useState<string[]>(["Containers", "Mixed Paper", "Office Paper", "Refuse (ICI Waste)", "Corrugated Cardboard", "Transfer Station Landfill Garbage"]);
    const [year, setYear] = useState<number[]>(years) 
    const [formData, setFormData] = useState<any>({})
    const [showGraph, setShowGraph] = useState<boolean>(false)
    const [dataState, setDataState] = useState({} as ChartData);


    useEffect(() => {
      setDataState({
      labels: [formData.yearOne, formData.yearTwo],
      datasets: [
        {
          label: "UBCV: " + formData.material,
          data:  [firstYearSum, secondYearSum],        
          borderColor: "#ddeeef",
          backgroundColor: "#ddeeef"
        },
      ]
    })
    }, [formData, firstYearSum, secondYearSum])

    console.log("formData", formData);
    console.log("dataset", dataState);




  const firstYear = useMemo(() => {
      return transformedData.filter((data: any) => {
        if(+data.year == formData.yearOne && data.material == formData.material) {
            return data
        }
      })
  }, [formData]);


  const secondYear = useMemo(() => {
     return transformedData.filter((data: any) => {
        if(+data.year == formData.yearTwo && data.material == formData.material) {
            return data
        }
    })
  }, [formData]);





useEffect(() => {
  let sum = 0;
  firstYear.forEach((element: any) => {
    sum += element.weight
  });

  setFirstYearSum(sum)

  let sum2 = 0;
  secondYear.forEach((element: any) => {
    sum2 += element.weight
  });
  setSecondYearSum(sum2)
}, [firstYear, secondYear])







  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(yearOne, yearTwo, material[0])
    setFormData({
      yearOne: +yearOne,
      yearTwo: +yearTwo,
      material: material[0]
    })
    console.log("formData", formData)
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
      <select className="border-2 border-lime-600" name="materials" id="materials" onChange={(e) => {setMaterial([e.target.value])}}>
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
      <select value={material} className="border-2 border-lime-600" name="materials" id="materials" onChange={(e) => {setMaterial([e.target.value])}}>
        {["Containers", "Mixed Paper", "Office Paper", "Refuse (ICI Waste)", "Corrugated Cardboard", "Transfer Station Landfill Garbage"].map((material: string) => {
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

    console.log("transformedData")

  return {
    props: {
      transformedData: transformedData,
      years: Array.from(years)
    },
  };
}
