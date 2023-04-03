import React from 'react'




export default function Input(props: any) {
    return (
    <div className='w-4/5 flex justify-center text-white rounded-lg bg-[#ff0606] my-10'>
        <p className="text-4xl my-2 mx-2">{props.text}</p>
    </div>
    )
}
