import React, { useState } from 'react'

import SiteInfo from './StepForm/SiteInfo'
import CompanyInfo from './StepForm/CompanyInfo'
import ConfirmForm from './StepForm/ConfirmForm'
import ButtonBackAndNext from '../button/ButtonBackAndNext'
import axios from 'axios'

export default function RootForm() {
  const [step, setStep] = useState(1)
  const [company, setCompany] = useState({
    Name: '',
    Address_line_1: '',
    Address_line_2: '',
    City: '',
    Zip: '',
    Province: '',
    Phone: '',
    Email: '',
  })

  const [companyType, setCompanyType] = useState({
    companyType: '',
    companyName: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
 
  }

  const clickBack = () => {
    if(step === 1) {
      window.location.href = '/create-role'
    }
    setStep(step - 1)
  }

  const clickNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const conditionalComponent = () => {
    switch (step) {
      case 1:
        return <SiteInfo company={company} setCompany={setCompany} title={"Company"}/>
      case 2:
        return <CompanyInfo companyType={companyType} setCompanyType={setCompanyType} />
      case 3:
        return <ConfirmForm company={company} companyType={companyType}  companyId={''}/>
      default:
        return <SiteInfo company={company} setCompany={setCompany} title={"Company"}/>
    }
  }

  return (
    //center the form
    <div className=' flex flex-col items-center justify-center py-8 flex-wrap'>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center ">
        <img
          src="/logo.png"
          className="w-36 mx-auto"
          alt="logo image" />

        <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
          Create a companny account
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md ">
        <div className="mb-4">
          {conditionalComponent()}
          { <ButtonBackAndNext type={step === 3 ? "submit" : "button"} text={step === 3 ? "Submit" : "Next"} clickBack={clickBack} clickNext={clickNext} />
          }
        </div>
      </form>
      
    </div>
  )
}
