import React from 'react'
import LableInput from '../../box/LableInput'

interface Props {
  companyType: any;
  setCompanyType: any;
}

export default function CompanyInfo({ companyType, setCompanyType }: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>Company InfohtmlFmation</div>
      <LableInput label="Company Name" name="companyName" value={companyType.companyName} onChange={(e) => setCompanyType({ ...companyType, companyName: e.target.value })} />
      <LableInput label="Company Phone" name="companyPhone" value={companyType.phone} onChange={(e) => setCompanyType({ ...companyType, phone: e.target.value })} />
      <LableInput label="Company Email" name="companyEmail" value={companyType.email} onChange={(e) => setCompanyType({ ...companyType, email: e.target.value })} />

      <label 
      htmlFor="countries" className="block text-gray-700 font-medium mb-2">Select an option</label>
      <select 
      value={companyType.companyType} onChange={(e) => setCompanyType({ ...companyType, companyType: e.target.value })}
      id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        <option defaultValue="">Choose a Type</option>
        <option value="SOURCE">SOURCE</option>
        <option value="COLLECTOR">COLLECTOR</option>
      </select>
    </div>
  )
}
