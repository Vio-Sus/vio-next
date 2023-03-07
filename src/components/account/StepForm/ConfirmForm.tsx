import React from 'react'
interface Props {
  companyType: any;
  companyAddress: any;
  siteList: any;
}


export default function ConfirmForm({ companyType, companyAddress, siteList }: Props) {
  console.log(siteList.length)
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700 '>Confirm Form</div>
      <div>
        <h3 className='text-lg my-3 font-bold mx-auto text-gray-700' >Company</h3>
        <p className="m-2 text-gray-500">Company Name: {companyType.companyName}</p>
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

      {siteList.length>0 &&
      <div>
        <h3 className='text-lg my-3 font-bold mx-auto text-gray-700' >Sites</h3>
        {Array.isArray(siteList) && siteList.map((site: any) => (
          <div key={site.name}>
            <p className="m-2 text-gray-500">Site Name: {site.name}</p>
          </div>
        ))}
      </div>}

    </div>
  )
}
