import React, { useState } from 'react'
import UserInfo from './UserInfo'
import SiteInfo from './SiteInfo'
import CompanyInfo from './CompanyInfo'
import ConfirmForm from './ConfirmForm'
import ButtonShort from '../button/ButtonShort'
import ButtonBackAndNext from '../button/ButtonBackAndNext'

export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [site, setSite] = useState({
    siteName: '',
    siteAddress_line_1: '',
    siteAddress_line_2: '',
    siteCity: '',
    siteZip: '',
    Province: '',
    sitePhone: '',
    siteEmail: '',
  })

  const [company, setCompany] = useState({
    companyType: '',
    companyName: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Add your submit logic here
    // console.log("ultimate data",user,site, company)
    console.log("clicckkck")
  }

  const clickBack = () => {
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
        return <UserInfo user={user} setUser={setUser} />
      case 2:
        return <SiteInfo site={site} setSite={setSite} />
      case 3:
        return <CompanyInfo company={company} setCompany={setCompany} />
      case 4:
        return <ConfirmForm user={user} site={site} company={company} />
      default:
        return <UserInfo user={user} setUser={setUser} />
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
          Create a manager account
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md ">
        <div className="mb-4">
          {conditionalComponent()}
          {step === 1 ? <ButtonShort text="Next" onClick={clickNext} /> :
            <ButtonBackAndNext type={step === 4 ? "submit" : "button"} text={step === 4 ? "Submit" : "Next"} clickBack={clickBack} clickNext={clickNext} />
          }
        </div>
      </form>
    </div>
  )
}
