import React from 'react'
import LabelInput from '../box/LableInput'
import LableInput from '../box/LableInput'

interface Props {
  company: any;
  setCompany: any;
}

export default function CompanyInfo({company, setCompany}: Props) {

  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>Company Information</div>
      <LableInput label="Company Name" name="companyName" value={company.companyName} onChange={(e) => setCompany({...company, companyName: e.target.value})}/>
      <LabelInput label="Company Type" name="companyType" value={company.companyType} onChange={(e) => setCompany({...company, companyType: e.target.value})}/>
    </div>
  )
}
