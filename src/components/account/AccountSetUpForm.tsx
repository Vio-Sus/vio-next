import React, { useState } from 'react'
import RedAlert from '../alerts/RedAlert'


export default function AccountSetUpForm() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [companyCode, setCompanyCode] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(companyCode === ""){
    console.log("submit form")
    console.log(companyCode)
    setShowAlert(true)
    setAlertMessage("Please enter a company code")
    }else{
      console.log("submit form")
      console.log(companyCode)
      setCompanyCode("")
    }
  }

  return (
    <div className=' flex flex-col items-center justify-center  flex-wrap'>

      <div className="p-6  md:space-y-6 sm:p-8 text-center">
        <img
          src="/logo.png"
          className="w-36 mx-auto"
          alt="logo image" />
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl mb-8">
          Thank you for Signing Up
        </h1>
        <div className='mt-2 mx-2.5 text-center'> Please enter the code provided by your administrator to get started with your account</div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm">
        <div className="flex items-center border-b border-[#80CF76] py-2">
          <input 
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="company code" aria-label="Full name" />
          <button className="flex-shrink-0 bg-[#80CF76] hover:bg-[#9FDF97] border-[#80CF76] hover:border-[#9FDF97] text-sm border-4 text-white py-1 px-2 rounded" type="submit">
            Submit
          </button>
          <button className="flex-shrink-0 border-transparent border-4 text-[#80CF76] hover:text-[#9FDF97] text-sm py-1 px-2 rounded"
            type="button">
            Cancel
          </button>
        </div>
      </form>
      {showAlert &&
        <RedAlert AletTitle="Note: " alertText={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
      }
    </div>
  )
}
