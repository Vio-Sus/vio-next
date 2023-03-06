import React from 'react'
import LabelInput from '../../box/LableInput'
import LableInput from '../../box/LableInput'

interface Props {
  companyType: any;
  setCompanyType: any;
}

export default function CompanyInfo({ companyType, setCompanyType }: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>Company Information</div>
      <LableInput label="Company Name" name="companyName" value={companyType.companyName} onChange={(e) => setCompanyType({ ...companyType, companyName: e.target.value })} />
      <LabelInput label="Company Type" name="companyType" value={companyType.companyType} onChange={(e) => setCompanyType({ ...companyType, companyType: e.target.value })} />
    </div>
  )
}
