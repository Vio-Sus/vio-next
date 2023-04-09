import React, {useEffect} from 'react'
interface Props {
    AletTitle: string,
    alertText: string,
    showAlert: boolean;
    setShowAlert: any;
}

export default function GreenAlert({ AletTitle, alertText, showAlert, setShowAlert}: Props) {
    useEffect(() => {
        if (showAlert) {
          document.body.style.overflow = "hidden"; // disable scrolling when alert is shown
        } else {
          document.body.style.overflow = ""; // re-enable scrolling when alert is hidden
        }
        return () => {
          document.body.style.overflow = ""; // re-enable scrolling when component is unmounted
        };
      }, [showAlert]);
      console.log(showAlert)
    return (
        <div className='w-1/2 mb-8 absolute top-20 left-1/2 transform -translate-x-1/2'>
        <div className="bg-green-100 border border-[#80CF76] text-teal-900 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{AletTitle}</strong>
            <span className="block sm:inline">{alertText}</span>
            <span onClick={() => {setShowAlert(false)}} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-[#80CF76]" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
        </div>
   
    )
}