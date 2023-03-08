interface Props {
  handleSubmit: (input: React.MouseEvent<HTMLButtonElement>) => void;
  chosenArray: string[];
}

export default function YearsLabel(props: Props) {
  return (
    <>
      {props.chosenArray.length > 0 ? (
        <button
          type="submit"
          onClick={props.handleSubmit}
          className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        >
          Compare
        </button>
      ) : (
        <button
          type="button"
          disabled={true}
          className="inline-block px-7 py-3 bg-gray-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 w-full"
        >
          Compare
        </button>
      )}
    </>
  );
}
