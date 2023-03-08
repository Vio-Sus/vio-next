import PickYear from "@/components/input/PickYear";
import PickMonth from "@/components/input/PickMonth";
import PickMaterial from "@/components/input/PickMaterial";
import CompareButton from "@/components/button/ButtonCompare"

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
          <PickMaterial
            chosenArray={props.chosenArray}
            material={props.material}
            setMaterial={props.setMaterial}
            onChange={props.onChange}
          />
        </div>
        <p>
          <CompareButton chosenArray={props.chosenArray} handleSubmit={props.handleSubmit}/>
        </p>
      </form>
    </div>
  );
}
