import React from 'react'
interface Props {
    placeholder: string;
    type: string;
}

export default function Input({placeholder, type}: Props) {
    return (
        <div className="mb-6">
        <input
            type={type}
            className="form-control block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={placeholder} />
    </div>

    )
}
