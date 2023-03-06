import PickYear from "@/components/input/PickYear"
import PickMonth from "@/components/input/PickMonth"


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
            <PickYear
            year={props.year}
            yearOne={props.yearOne}
            setYearOne={props.setYearOne}
            idAndName="yearOne"
            labelName="Year One"
            />
            <PickMonth
            months={props.months}
            monthOne={props.monthOne}
            setMonthOne={props.setMonthOne}
            idAndName="monthOne"
            labelName="The Month For Year One"
            />
            <PickYear
            year={props.year}
            yearOne={props.yearTwo}
            setYearOne={props.setYearTwo}
            idAndName="yearTwo"
            labelName="Year Two"
            />
            <PickMonth
            months={props.months}
            monthOne={props.monthTwo}
            setMonthOne={props.setMonthTwo}
            idAndName="monthTwo"
            labelName="The Month For Year Two"
            />
  
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
          </div>
  
          <p>
            {props.chosenArray.length > 0 && (
              <button
                type="submit"
                onClick={props.handleSubmit}
                className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Compare
              </button>
            )}
          </p>
        </form>
      </div>
    );
  }
  