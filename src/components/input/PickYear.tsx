interface Props {
  setYearOne: (input: string) => void;
  year: number[];
  yearOne: string;
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
        value={props.yearOne}
        id={props.idAndName}
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
  );
}
