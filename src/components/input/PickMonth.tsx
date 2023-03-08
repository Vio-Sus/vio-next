interface Props {
  setMonthOne: (input: string) => void;
  months: string[];
  monthOne: string;
  idAndName: string;
  labelName: string;
}

export default function YearsLabel(props: Props) {
  return (
    <div className="flex mb-12  flex-col">
      <label htmlFor={props.idAndName} className="mt-0">
        {props.labelName}
      </label>
      <select
        className="border-2 border-lime-600"
        name={props.idAndName}
        id={props.idAndName}
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
  );
}
