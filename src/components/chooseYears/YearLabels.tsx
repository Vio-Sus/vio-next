interface Props {
  setYearOne: (input: string) => void;
  setMonthOne: (input: string) => void;
  year: number[];
  months: string[];
  setYearTwo: (input: string) => void;
  setMonthTwo: (input: string) => void;
  setMaterial: (input: [string]) => void;
  material: string[];
  chosenArray: string[];
  yearOne: string;
  yearTwo: string;
  monthOne: string;
  monthTwo: string;
  handleSubmit: (input: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
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
              value={props.yearOne}
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
            <label htmlFor="monthOne" className="mt-0">
              The Month For Year One
            </label>
            <select
              className="border-2 border-lime-600"
              name="monthOne"
              id="monthOne"
              value={props.monthOne}
              onChange={(e) => {
                props.setMonthOne(e.target.value);
              }}
            >
              {props.months.map((month: string) => {
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex mb-12  flex-col">
            <label htmlFor="yearTwo">Year Two</label>
            <select
              className="border-2 border-lime-600"
              value={props.yearTwo}
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
            <label htmlFor="monthTwo" className="mt-0">
              The Month For Year Two
            </label>
            <select
              className="border-2 border-lime-600"
              name="monthTwo"
              id="monthTwo"
              value={props.monthTwo}
              onChange={(e) => {
                props.setMonthTwo(e.target.value);
              }}
            >
              {props.months.map((month: string) => {
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col mb-12">
            <span>Material</span>
            {props.material.map((material: string) => (
              <div key={material} className="flex items-center">
                {props.chosenArray.includes(material) ? (
                  <input
                    type="checkbox"
                    name="materials"
                    id={material}
                    value={material}
                    defaultChecked={true}
                    onChange={props.onChange}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="materials"
                    id={material}
                    value={material}
                    onChange={props.onChange}
                  />
                )}
                <label htmlFor={material} className="ml-2">
                  {material}
                </label>
              </div>
            ))}
          </div>

          {/* <div className="flex mb-12  flex-col">
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
          </div> */}
        </div>

        <p>
          {props.chosenArray.length > 0 &&<button
            type="submit"
            onClick={props.handleSubmit}
            className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          >
            Compare
          </button>}
        </p>
      </form>
    </div>
  );
}
