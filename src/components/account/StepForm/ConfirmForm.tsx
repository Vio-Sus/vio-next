import React from 'react'
interface Props {
  company: any;
  site: any;
  headerCompany: boolean;
  companyId: string;
}


export default function ConfirmForm({ company, site, headerCompany, companyId }: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700 '>Confirm Form</div>

      <div>
        <h3 className='text-lg my-3 font-bold mx-auto text-gray-700' >Site Information</h3>
        <p className="m-2 text-gray-500">Site Name: {site.siteName}</p>
        <p className="m-2 text-gray-500">Site Type: {site.siteType}</p>
        <p className="m-2 text-gray-500">Site Address: {site.siteAddress}</p>
        <p className="m-2 text-gray-500">Site City: {site.siteCity}</p>
        <p className="m-2 text-gray-500">Site Province: {site.siteProvince}</p>
        <p className="m-2 text-gray-500">Site Zip Code: {site.siteZip}</p>
      </div>
  
       <div>
       <h3 className='text-lg my-3 font-bold mx-auto text-gray-700'>CompanyInformation </h3>
        { headerCompany ? <p className="m-2 text-gray-500">Company Id: {companyId}</p> :
          <>
          <p className="m-2 text-gray-500">Company Name: {company.companyName}</p>
          <p className="m-2 text-gray-500">Company Type: {company.companyType}</p>
          </>}
     </div>
    </div>
  )
}
