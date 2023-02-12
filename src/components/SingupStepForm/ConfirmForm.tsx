import React from 'react'
interface Props {
  company: any;
  site: any;
  user: any;
}


export default function ConfirmForm({ company, site, user }: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>Confirm Form</div>
      <div>
        <h3>Company</h3>
        <p>Company Name: {company.companyName}</p>
        <p>Company Type: {company.companyType}</p>

      </div>
      <div>
        <h3>Site</h3>
        <p>Site Name: {site.siteName}</p>
        <p>Site Type: {site.siteType}</p>
        <p>Site Address: {site.siteAddress}</p>
        <p>Site City: {site.siteCity}</p>
        <p>Site Province: {site.siteProvince}</p>
        <p>Site Zip: {site.siteZip}</p>
        <p>Site Phone: {site.sitePhone}</p>
        <p>Site Email: {site.siteEmail}</p>

      </div>
      <div>
        <h3>User</h3>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
        <p>Confirm Password: {user.confirmPassword}</p>
      </div>
    </div>
  )
}
