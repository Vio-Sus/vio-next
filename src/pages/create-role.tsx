import React, { useState } from 'react'
import RedAlert from '@/components/alerts/RedAlert'
import { RootForm, AccountSetUpForm } from '@/components/account'


export default function AccountSetting() {
    const [showAlert, setShowAlert] = useState(false)
    const [showWorkerForm, setShowWorkerForm] = useState(false)
    const [showRootForm, setShowRootForm] = useState(false)



    return (
        <>
            <div className='' >
                {showAlert &&
                    <RedAlert AletTitle="Note: " alertText='Please choose a role' showAlert={showAlert} setShowAlert={setShowAlert} />}
            </div>
            <AccountSetUpForm />
            <p className="text-sm text-center pt-8 font-light text-gray-900">
                Do not have a company code? <a href="/create-root-account" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Create a root account</a>
            </p>
        </>

    )
}
