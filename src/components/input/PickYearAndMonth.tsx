import PickYear from "@/components/input/PickYear";
import PickMonth from "@/components/input/PickMonth";

interface Props {
  setYearOne: (input: string) => void;
  setMonthOne: (input: string) => void;
  year: number[];
  months: string[];
  yearOne: string;
  monthOne: string;
  idAndNameYear: string;
  labelNameYear: string;
  idAndNameMonth: string;
  labelNameMonth: string;
}

export default function YearsLabel(props: Props) {
  return (
    <>
      <PickYear
        year={props.year}
        yearOne={props.yearOne}
        setYearOne={props.setYearOne}
        idAndName={props.idAndNameYear}
        labelName={props.labelNameYear}
      />
      <PickMonth
        months={props.months}
        monthOne={props.monthOne}
        setMonthOne={props.setMonthOne}
        idAndName={props.idAndNameMonth}
        labelName={props.labelNameMonth}
      />
    </>
  );
}
