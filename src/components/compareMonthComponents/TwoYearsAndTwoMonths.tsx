import PickMaterial from "@/components/input/PickMaterial";
import CompareButton from "@/components/button/ButtonCompare";
import PickYearAndMonth from "@/components/input/PickYearAndMonth";

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
  onAddYearAndMonth: (e: React.MouseEvent<HTMLButtonElement>) => void;
  arrayOfExtraInputs: React.ReactNode[];
}

export default function YearsLabel(props: Props) {
  return (
    <div className="content-start m-12">
      <form action="#">
        <div className="flex  flex-col gap-3">
          <PickYearAndMonth
            year={props.year}
            yearOne={props.yearOne}
            setYearOne={props.setYearOne}
            idAndNameYear="yearOne"
            labelNameYear="Year One"
            months={props.months}
            monthOne={props.monthOne}
            setMonthOne={props.setMonthOne}
            idAndNameMonth="monthOne"
            labelNameMonth="The Month For Year One"
          />
          <PickYearAndMonth
            year={props.year}
            yearOne={props.yearTwo}
            setYearOne={props.setYearTwo}
            idAndNameYear="yearTwo"
            labelNameYear="Year Two"
            months={props.months}
            monthOne={props.monthTwo}
            setMonthOne={props.setMonthTwo}
            idAndNameMonth="monthTwo"
            labelNameMonth="The Month For Year Two"
          />
          <>
            {props.arrayOfExtraInputs?.map((m: React.ReactNode, i: number) => {
              return <div key={i}>{m}</div>;
            })}
          </>
          <PickMaterial
            chosenArray={props.chosenArray}
            material={props.material}
            setMaterial={props.setMaterial}
            onChange={props.onChange}
          />
        </div>
        <p>
          <CompareButton
            chosenArray={props.chosenArray}
            handleSubmit={props.handleSubmit}
          />
        </p>
      </form>
    </div>
  );
}
