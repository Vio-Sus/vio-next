import React, { useState } from "react";
import axios from "axios";
import compare from "../../pages/compare";

interface YearAndMaterialInputsProps {
//   formData: {
//     yearOne: string;
//     yearTwo: string;
//     material: string;
//   };
}
//   year,
//   materials,
//   onYearOneChange,
//   onYearTwoChange,
//   onMaterialChange,

const YearAndMaterialInputs: React.FC<YearAndMaterialInputsProps> = () => {

  const [yearOne, setYearOne] = useState<string>("");
  const [yearTwo, setYearTwo] = useState<string>("");
  const [material, setMaterial] = useState<string[]>(["Containers", "Mixed Paper", "Office Paper", "Refuse", "Moisture Correction", "Corrugated Cardboard"]);
  const [year, setYear] = useState<number[]>([2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020])
  const [formData, setFormData] = useState({})

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(yearOne, yearTwo, material[0])
    setFormData({
      yearOne: yearOne,
      yearTwo: yearTwo,
      material: material[0]
    })
  }

    



  return (
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
  );
};

export default YearAndMaterialInputs;

