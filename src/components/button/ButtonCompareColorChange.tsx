interface Props {
  handleSubmit: (input: React.MouseEvent<HTMLButtonElement>) => void;
  chosenArray: string[];
}

export default function YearsLabel(props: Props) {
  return (
    <>
      {props.chosenArray.length > 0 ? (
        <a className="text-lg flex rounded justify-center group relative  overflow-hidden border w-full border-[#80CF76] px-8 py-3 focus:outline-none focus:ring">
          <span
            onClick={props.handleSubmit}
            className="absolute inset-x-0 top-0 h-[2px] w-full bg-[#80CF76] transition-all group-hover:h-full group-active:bg-[#80CF76]"
          ></span>

          <span className="text-lg relative font-medium text-[#80CF76] transition-colors group-hover:text-white">
            Compare
          </span>
        </a>
      ) : (
        <a className="text-lg flex rounded justify-center group relative  overflow-hidden border w-full border-[#db1919] px-8 py-3 focus:outline-none focus:ring">
          <span className="absolute inset-x-0 top-0 h-[2px] w-full bg-[#ff0000] transition-all group-hover:h-full group-active:bg-[#ff0707]"></span>

          <span className="text-lg relative font-medium text-[#ff1c1c] transition-colors group-hover:text-white">
            Compare
          </span>
        </a>
      )}
    </>
  );
}
