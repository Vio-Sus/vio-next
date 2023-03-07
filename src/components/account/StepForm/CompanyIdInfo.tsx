import React from 'react'
import LableInput from '../../box/LableInput'


interface Props {
    companyId: any;
    setCompanyId: any;
}

export default function CompanyIdInfo({ companyId, setCompanyId }: Props) {
    return (
        <div className='w-80 flex flex-col'>
            <LableInput label="Company Id" name="companyName" value={companyId} onChange={(e)=>{setCompanyId(e.target.value)}} />
        </div>
    )
}
