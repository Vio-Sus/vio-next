import React from 'react'
interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


export default function ButtonPrimary({children, onClick}: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md  w-full"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light">
     {children}
    </button>
  )
}
