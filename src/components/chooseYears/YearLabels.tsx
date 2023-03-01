import { useEffect, useMemo, useState } from "react";

interface Props {
  setYearOne: (input: string) => void;
  year: number[];
  setYearTwo: (input: string) => void;
  setMaterial: (input: [string]) => void;
  material: string[];
  handleSubmit: (input: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function YearsLabel(props: Props) {
  return (
    <div className="content-start m-12">
      <form action="#">
        <div className="flex  flex-col gap-3">
          <div className="flex mb-12  flex-col">
            <label htmlFor="yearOne" className="mt-0">
              Year One
            </label>
            <select
              className="border-2 border-lime-600"
              name="yearOne"
              id="yearOne"
              onChange={(e) => {
                props.setYearOne(e.target.value);
              }}
            >
              {props.year.map((year: number) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex mb-12  flex-col">
            <label htmlFor="yearTwo">Year Two</label>
            <select
              className="border-2 border-lime-600"
              name="yearTwo"
              id="yearTwo"
              onChange={(e) => {
                props.setYearTwo(e.target.value);
              }}
            >
              {props.year.map((year: number) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex mb-12  flex-col">
            <label htmlFor="materials">Material</label>
            <select
              className="border-2 border-lime-600"
              name="materials"
              id="materials"
              onChange={(e) => {
                props.setMaterial([e.target.value]);
              }}
            >
              {props.material.map((material: string) => {
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
            onClick={props.handleSubmit}
            className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Compare
          </button>
        </p>
      </form>
    </div>
  );
}
