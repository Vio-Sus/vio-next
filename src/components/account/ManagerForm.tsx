import React, { useEffect, useState } from 'react'

import SiteInfo from './StepForm/SiteInfo'
import CompanyInfo from './StepForm/CompanyInfo'
import ConfirmForm from './StepForm/ConfirmForm'
import ButtonBackAndNext from '../button/ButtonBackAndNext'
import Radio from './StepForm/Radio'
import CompanyIdInfo from './StepForm/CompanyIdInfo'
import RedAlert from '../alerts/RedAlert'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import ButtonShort from '../button/ButtonShort'
import ButtonSecondary from '../button/ButtonSecondary'

export default function SignupForm() {
  const [step, setStep] = useState(1)
  const [site, setSite] = useState({
    siteName: '',
    siteAddress_line_1: '',
    siteAddress_line_2: '',
    siteCity: '',
    siteZip: '',
    province: '',
  })
  const { data: session, status } = useSession()
  const [company, setCompany] = useState({
    companyType: '',
    companyName: '',
  })

  const [headerCompany, setHeaderCompany] = useState(true)
  const [companyId, setCompanyId] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  // redirect page after submissiion

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("submit form", site, company, headerCompany, companyId)
    if (headerCompany) {
      console.log("header company")
      // header company --- post user to api/manager with company id
      // axios.post("api/managerWithCompanyId", {
      //   site: site,
      //   company: {
      //     companyId: companyId
      //   }
      // })
    } else {
      console.log("not header company")
      axios.post("api/account/manager", {
        site: site,
        company: company,
        email: session?.user?.email
      }).then(res => {
        if(res.data.success){
          window.location.href = "/"
        }
      })
    }
  }

  const clickBack = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log('clickBack', step);
    if (step === 1) {
      console.log('redirecting to /AccountSetting');
      window.location.href = '/AccountSetting';
    } else {
      console.log('decreasing step by 1');
      setStep(step - 1);
    }
    
  }


  const clickNext = () => {
    if (step === 1) {
      if (site.siteName === '' || site.siteAddress_line_1 === '' || site.siteCity === '' || site.siteZip === '' || site.province === '') {
        setShowAlert(true)
        setAlertMessage("Please fill out all the fields")
      } else {
        setStep(step + 1)
      }
    }
    else if (step === 2) {
      setStep(step + 1)
    } else if (step === 3) {
      if (headerCompany) {
        if (companyId === '') {
          alert("Please fill out all the fields")
        } else {
          setStep(step + 1)
        }
      } else {
        if (company.companyName === '' || company.companyType === '') {
          setShowAlert(true)
          setAlertMessage("Please fill out all the fields")
        } else {
          setStep(step + 1)
        }
      }
    }
  }


  const conditionalComponent = () => {
    switch (step) {
      case 1:
        return <SiteInfo site={site} setSite={setSite} title={"Site"} />
      case 2:
        return <Radio setHeaderCompany={setHeaderCompany} />
      case 3:
        // return company componnet or company id component
        return headerCompany ? <CompanyIdInfo companyId={companyId} setCompanyId={setCompanyId} /> : <CompanyInfo company={company} setCompany={setCompany} />
      case 4:
        return <ConfirmForm site={site} company={company} headerCompany={headerCompany} companyId={companyId} />
      default:
        return <SiteInfo site={site} setSite={setSite} title={"Site"} />
    }
  }

  return (
    //center the form
    <div className=' flex flex-col items-center justify-center py-8 flex-wrap '>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
        <img
          src="/logo.png"
          className="w-36 mx-auto"
          alt="logo image" />

        <h1 className="text-xl  font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
          Create a manager account
        </h1>
      </div>
      <form className="bg-white p-6 rounded-lg shadow-md ">
        <div className="mb-4">
          {conditionalComponent()}
          {step === 4 ? <div className='flex flow-row space-x-36 '> <ButtonSecondary
            text="Back"
            type="button"
            onClick={clickBack}
          /> <ButtonShort
              text="Submit"
              type="submit"
              onClick={handleSubmit}
            /> </div> : <ButtonBackAndNext
            type="button" text="Next" clickBack={clickBack} clickNext={clickNext} />
          }
        </div>
      </form>
      {showAlert &&
        <RedAlert AletTitle="Note: " alertText={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
      }

    </div>
  )
}
