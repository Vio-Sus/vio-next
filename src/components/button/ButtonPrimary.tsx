import React from 'react'
interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}


export default function ButtonPrimary({children, onClick}: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light">
     {children}
    </button>
  )
}
