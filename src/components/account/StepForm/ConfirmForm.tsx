import React from 'react'
interface Props {
  companyType: any;
  companyAddress: any;

}


export default function ConfirmForm({ companyType, companyAddress }: Props) {

  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700 '>Confirm Form</div>
      <div>
        <h3 className='text-lg my-3 font-bold mx-auto text-gray-700' >Company</h3>
        <p className="m-2 text-gray-500">Company Name: {companyType.company}</p>
        <p className="m-2 text-gray-500">Company Phone: {companyType.phone}</p>
        <p className="m-2 text-gray-500">Company Email: {companyType.email}</p>
        <p className="m-2 text-gray-500">Company Type: {companyType.companyType}</p>
      </div>


      <div>
        <h3 className='text-lg my-3 font-bold mx-auto text-gray-700' >Address</h3>
        <p className="m-2 text-gray-500">ddress_line_1: {companyAddress.address_line_1}</p>
        <p className="m-2 text-gray-500">Address_line_2: {companyAddress.address_line_2}</p>
        <p className="m-2 text-gray-500">City: {companyAddress.city}</p>
        <p className="m-2 text-gray-500">Zip: {companyAddress.zip}</p>
        <p className="m-2 text-gray-500">Province: {companyAddress.province}</p>
      </div>

    </div>
  )
}
