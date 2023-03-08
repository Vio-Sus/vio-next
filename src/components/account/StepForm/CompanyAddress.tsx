import { title } from 'process';
import React from 'react'
import LableInput from '../../box/LableInput'

interface Props {
  companyAddress: any;
  setCompanyAddress: any;
}

export default function companyAdress({ companyAddress, setCompanyAddress }: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'> Company Address</div>
      <LableInput label="Address Line 1" name="address_line_1" value={companyAddress.address_line_1} onChange={(e) => setCompanyAddress({ ...companyAddress, address_line_1: e.target.value })} />
      <LableInput label="Address Line 2" name="address_line_2" value={companyAddress.address_line_2} onChange={(e) => setCompanyAddress({ ...companyAddress, address_line_2: e.target.value })} />
      <LableInput label="City" name="city" value={companyAddress.city} onChange={(e) => setCompanyAddress({ ...companyAddress, city: e.target.value })} />
      <LableInput label="Zip" name="zip" value={companyAddress.zip} onChange={(e) => setCompanyAddress({ ...companyAddress, zip: e.target.value })} />
      <LableInput label="Province" name="province" value={companyAddress.province} onChange={(e) => setCompanyAddress({ ...companyAddress, province: e.target.value })} />
        
    </div>
  )
}
