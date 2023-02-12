import React from 'react'
import LableInput from '../box/LableInput'

interface Props {
  site: any;
  setSite: any;
}

export default function SiteInfo({site, setSite}: Props) {
  return (
    <div className='w-80 flex flex-col'>
      <div className='text-lg my-3 font-bold mx-auto text-gray-700'>Site Information</div>
    <LableInput label="Site Name" name="siteName" value={site.siteName} onChange={(e) => setSite({...site, siteName: e.target.value})}/>
    <LableInput label="Site Address Line one" name="siteAddress_line_1" value={site.siteAddress_line_1} onChange={(e) => setSite({...site, siteAddress_line_1: e.target.value})}/>
    <LableInput label="Site Address Line two" name="siteAddress_line_2" value={site.siteAddress_line_2} onChange={(e) => setSite({...site, siteAddress_line_2: e.target.value})}/>
    <LableInput label="Site City" name="siteCity" value={site.siteCity} onChange={(e) => setSite({...site, siteCity: e.target.value})}/>
    <LableInput label="Site Province" name="siteProvince" value={site.siteProvince} onChange={(e) => setSite({...site, siteProvince: e.target.value})}/>
    <LableInput label="Site Zip" name="siteZip" value={site.siteZip} onChange={(e) => setSite({...site, siteZip: e.target.value})}/>
    <LableInput label="Site Phone" name="sitePhone" value={site.sitePhone} onChange={(e) => setSite({...site, sitePhone: e.target.value})}/>
    <LableInput label="Site Email" name="siteEmail" value={site.siteEmail} onChange={(e) => setSite({...site, siteEmail: e.target.value})}/>
    </div>
  )
}
