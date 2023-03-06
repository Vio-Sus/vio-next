import React from 'react'

interface Props {
    setHeaderCompany: any;
}

export default function Radio({setHeaderCompany}: Props) {
    return (
        <>
            <div className='m-2.5 text-center'> Do you have a header company?</div>
            <div className="flex justify-center">
                <div className="flex gap-10 ">
                    <div className="inline-flex items-center">
                        <label
                            className="relative flex cursor-pointer items-center rounded-full p-3"
                            htmlFor="html"
                            data-ripple-dark="true"
                        >
                            <input
                                onChange={(e) => {setHeaderCompany(true)}}
                                id="html"
                                name="type"
                                type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-500 text-[#80CF76] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#80CF76] checked:before:bg-[#80CF76] hover:before:opacity-10"
                                defaultChecked
                            />
                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#80CF76] opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                >
                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                            </div>
                        </label>
                        <label
                            className="mt-px cursor-pointer select-none font-light text-gray-700"
                            htmlFor="html"
                        >
                            Yes
                        </label>
                    </div>
                    <div className="inline-flex items-center">
                        <label
                            className="relative flex cursor-pointer items-center rounded-full p-3"
                            htmlFor="react"
                            data-ripple-dark="true"
                        >
                            <input
                             onChange={(e) => {setHeaderCompany(false)}}
                                id="react"
                                name="type"
                                type="radio"
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-500 text-[#80CF76] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#80CF76] checked:before:bg-[#80CF76] hover:before:opacity-10"
                            />
                            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-[#80CF76] opacity-0 transition-opacity peer-checked:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                >
                                    <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                            </div>
                        </label>
                        <label
                            className="mt-px cursor-pointer select-none font-light text-gray-700"
                            htmlFor="react"
                        >
                            No
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
