import React from 'react'
import LableInput from '../box/LableInput'
interface Props {
    user: any;
    setUser: any;
}

export default function UserInfo({ user, setUser }: Props) {
    return (
        <div className='w-80 flex flex-col'>
            <div className='text-lg my-3 font-bold mx-auto text-gray-700'>User Information</div>
            <LableInput label="First Name" name="firstName" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
            <LableInput label="Last Name" name="lastName" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            <LableInput label="Email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <LableInput label="Password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <LableInput label="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
        </div>

    )
}