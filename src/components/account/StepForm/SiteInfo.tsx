import { title } from 'process';
import React from 'react'
import LableInput from '../../box/LableInput'

interface Props {
  company: any;
  setCompany: any;
  title: string;
}

export default function companyInfo({company, setCompany, title}: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>company Information</div>
    <LableInput  label={`${title} name`} name="companyName" value={company.companyName} onChange={(e) => setCompany({...company, companyName: e.target.value})}/>
    <LableInput  label={`${title}  Address Line one`} name="companyAddress_line_1" value={company.companyAddress_line_1} onChange={(e) => setCompany({...company, companyAddress_line_1: e.target.value})}/>
    <LableInput  label={`${title}  Address Line two`} name="companyAddress_line_2" value={company.companyAddress_line_2} onChange={(e) => setCompany({...company, companyAddress_line_2: e.target.value})}/>
    <LableInput  label={`${title}  City`} name="companyCity" value={company.companyCity} onChange={(e) => setCompany({...company, companyCity: e.target.value})}/>
    <LableInput  label={`${title}  Province`} name="companyProvince" value={company.province} onChange={(e) => setCompany({...company, province: e.target.value})}/>
    <LableInput  label={`${title}  Zip`} name="companyZip" value={company.companyZip} onChange={(e) => setCompany({...company, companyZip: e.target.value})}/>
    </div>
  )
}
