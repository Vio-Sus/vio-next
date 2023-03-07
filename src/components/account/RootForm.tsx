import React, { useState } from 'react'

import SiteInfo from './StepForm/CompanyAddress'
import CompanyInfo from './StepForm/CompanyInfo'
import ConfirmForm from './StepForm/ConfirmForm'
import ButtonBackAndNext from '../button/ButtonBackAndNext'
import axios from 'axios'
import RedAlert from '../alerts/RedAlert'
import ButtonShort from '../button/ButtonShort'
import ButtonSecondary from '../button/ButtonSecondary'

export default function RootForm() {
  const [step, setStep] = useState(1)
  const [companyAddress, setCompanyAddress] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    zip: '',
    province: '',
  })

  const [companyType, setCompanyType] = useState({
    companyType: '',
    companyName: '',
    phone: '',
    email: '',
  }
  )
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [siteList, setSiteList] = useState({
    name: ''
  })


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("clickk submit")
    console.log(companyType)
    try {
        axios.post('/api/account/root', {
          companyType,
          companyAddress,
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            window.location.href = '/account';
          }
        })   
    } catch (error) {
      console.log(error)
    }
  }

  const clickBack = () => {
    if (step == 1) {
      window.location.href = '/create-role';
    } else if (step > 1) {
      setStep(step - 1);
    }
  };


  const clickNext = () => {
    if (step === 1) {
      if (companyType.companyName === '' || companyType.phone === '  ' || companyType.email === '' || companyType.companyType === '') {
        setShowAlert(true)
        setAlertMessage('Please fill out all fields')
      } else {
        setStep(step + 1)
      }
    }
    if (step === 2) {
      if (companyAddress.address_line_1 === '' || companyAddress.city === '' || companyAddress.zip === '' || companyAddress.province === '') {
        setShowAlert(true)
        setAlertMessage('Please fill out all fields')
      } else {
        setStep(step + 1)
      }
    } 
  }



  const conditionalComponent = () => {
    switch (step) {
      case 1:
        return <CompanyInfo companyType={companyType} setCompanyType={setCompanyType} />
      case 2:
        return <SiteInfo companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} />
      case 3:
        return <ConfirmForm companyAddress={companyAddress} companyType={companyType} siteList={siteList} />
      default:
        return <CompanyInfo companyType={companyType} setCompanyType={setCompanyType} />
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
          Create a root account
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md ">
        <div className="mb-4">
          {conditionalComponent()}
          {step === 3 ? <div className='flex flow-row space-x-36 '> <ButtonSecondary
            text="Back"
            type="button"
            onClick={clickBack}
          /> <ButtonShort
              text="Submit"
              type="submit"
            /> </div> : <ButtonBackAndNext
            clickBack={clickBack} clickNext={clickNext} />
          }
        </div>
      </form>
      {showAlert &&
        <RedAlert AletTitle="Note: " alertText={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
      }
    </div>
  )
}
