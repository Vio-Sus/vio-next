import React from 'react'
interface Props {
    type?: 'submit' | 'button' | 'reset';
    clickBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    clickNext?: () => void;
    text: string;
}

export default function ButtonBackAndNext({ clickBack, clickNext, text, type }: Props) {
    return (
        <div className='flex flow-row space-x-36'>
            <div className='my-9'>
                <button onClick={clickBack}
                    className="inline-block px-7 py-3 bg-white text-dark border border-[#80CF76] font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97] hover:shadow-lg transition duration-150 ease-in-out w-full">
                    Back
                </button>
            </div>
            <div className='my-9'>
                <button
                    type={type}
                    onClick={clickNext}
                    className="inline-block px-7 py-3 bg-[#80CF76] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#9FDF97] hover:shadow-lg transition duration-150 ease-in-out w-full">
                    {text}
                </button>
            </div>
        </div>
    );
}