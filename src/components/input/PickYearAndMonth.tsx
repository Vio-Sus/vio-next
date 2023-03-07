import PickYear from "@/components/input/PickYear";
import PickMonth from "@/components/input/PickMonth";

interface Props {
  setYearOne: (input: string) => void;
  setMonthOne: (input: string) => void;
  year: number[];
  months: string[];
  setYearTwo: (input: string) => void;
  setMonthTwo: (input: string) => void;
  yearOne: string;
  yearTwo: string;
  monthOne: string;
  monthTwo: string;
}

export default function YearsLabel(props: Props) {
  return (
    <>
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
    </>
  );
}
