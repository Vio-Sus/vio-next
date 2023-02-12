import React from 'react';

interface Props {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  text: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ButtonShort({ text, type, onClick }: Props) {
  return (
    <div className='my-9'>
    <button
      type={type}
      className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97] hover:shadow-lg transition duration-150 ease-in-out "
      onClick={onClick}
    >
      {text}
    </button>
    </div>
  );
}
