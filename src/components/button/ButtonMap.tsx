import React from "react";

interface Props {
  type?: "submit" | "reset" | "button";
  className?: string;
  text?: React.ReactNode;
  onClick(input: string): void; 
  ButtonArray: string[];
}

export default function ButtonShort({
  onClick,
  ButtonArray,
}: Props) {
  return (
    <div className="my-9 flex flex-nowrap justify-center  ">
      {ButtonArray.map((m: string) => {
        return (
          <button
            type={"button"}
            className="mx-auto px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-[#9FDF97] hover:shadow-lg transition duration-150 ease-in-out"
            onClick={() => onClick(m)}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}
