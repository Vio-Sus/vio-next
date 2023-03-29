import React from 'react';

interface Props {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  redirect: string;
}

export default function RedirectButton({children, onClick, redirect}: Props) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = redirect;
    onClick(e);
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md w-full hover:bg-[#6dbb5f] mt-8"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light">
     {children}
    </button>
  );
}
