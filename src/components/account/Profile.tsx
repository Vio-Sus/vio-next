import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonShort from '../button/ButtonShort';
import { signOut } from 'next-auth/react'
import CompanyAddress from './StepForm/CompanyAddress'
import CompanyInfo from './StepForm/CompanyInfo'
import { Prisma } from '@prisma/client';
import { CiEdit } from 'react-icons/ci'
import { RxUpdate } from 'react-icons/rx'
import Loader from '../loader/Loader';
import ButtonWithLoader from '../button/ButtonWithLoader';
import GreenAlert from '../alerts/GreenAlert';
import RedAlert from '../alerts/RedAlert';



enum Role {
  ROOT = "ROOT",
  ADMIN = "ADMIN",
  USER = "USER",
  TEMP_ = "TEMP_"
}

interface User {
  id: string;
  role: Role;
  name?: string | null;
  email?: string | null;
}



export default function Profile() {

  const [editCompany, setEditCompany] = useState(false)
  const [EditAddress, setEditAddress] = useState(false)

  const [showInfo, setShowInfo] = useState(true)
  // query user data from api
  const [user, setUser] = useState<User>();
  const [company, setCompany] = useState<Prisma.CompanySelect>();

  const [companyType, setCompanyType] = useState({
    companyType: '',
    company: '',
    phone: '',
    email: '',
  })
  const [companyAddress, setCompanyAddress] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    zip: '',
    province: '',
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/account/user');
        setUser(response.data.user);
        setCompany(response.data.company);
        setCompanyType({
          companyType: response.data.company.company_type,
          company: response.data.company.company,
          phone: response.data.company.phone,
          email: response.data.company.email,
        })
        setCompanyAddress({
          address_line_1: response.data.company.address_line_1,
          address_line_2: response.data.company.address_line_2,
          city: response.data.company.city.city,
          zip: response.data.company.zip_code,
          province: response.data.company.city.province.province,
        })

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // Clean up function to cancel any outstanding requests
    return () => {
      axios.CancelToken.source().cancel('Request cancelled on unmount');
    };
  }, []);

  function handleEditCompany() {
    setEditCompany(true)
    setEditAddress(false)
    setShowInfo(false)
  }

  function handleEditAddress() {
    setEditAddress(true)
    setEditCompany(false)
    setShowInfo(false)
  }

  function handleSubmitCompany() {
    try {
      axios.patch('/api/account/root', {
        companyType,
        companyId: company?.id,
        task: "info"
      }).then((res) => {
        console.log(res)
        setCompany(res.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleSubmitAddress() {
    try {
      axios.patch('/api/account/root', {
        companyAddress,
        companyId: company?.id,
        task: "address"
      }).then((res) => {
        console.log(res)
        setCompany(res.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleUpdateAdminCode() {
    console.log("update admin code with companyId: ", company?.id)
    try {
      axios.put('/api/account/root', { companyId: company?.id, role: 'ADMIN' })
        .then((res) => {
          console.log(res)
          setCompany({ ...company, admin_code: res.data })
        })
    } catch (error) {
      console.error(error)
    }
  }

  function handleUpdateUserCode() {
    console.log("update user code with companyId: ", company?.id)
    try {
      axios.put('/api/account/root', { companyId: company?.id, role: 'USER' })
        .then((res) => {
          console.log(res)
          setCompany({ ...company, user_code: res.data })
        })
    }
    catch (error) {
      console.error(error)
    }
  }

  function cancelEdit() {
    setEditAddress(false)
    setEditCompany(false)
    setShowInfo(true)
  }

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('')
  const [loading, setLoading] = useState(false)

  function inviteUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("invite user with companyId: ", company?.id)
    console.log(inviteEmail, inviteRole)
    if (inviteEmail === '' || inviteRole === '') {
      setShowError(true)
      return
    }
    try {
      setLoading(true)
      axios.post(`${process.env.NEXT_PUBLIC_EMAIL_URL}/api/Email`, {
        to: inviteEmail,
        subject: `Invitation to join ${company?.company}`,
        body: `You have been invited to join ${company?.company}. Please click the link below to join and enter your usercode with ${inviteRole}. <br> <a href="https://vio-next-five.vercel.app/">VIO Sustainability</a>`,
      }).then((res) => {
        if (res.status === 200) {
          setLoading(false)
          setShowSucess(true)
          setInviteEmail('')
          setInviteRole('')
        }
      }
      )
    } catch (error) {
      console.error(error)
    }

  }
   const [showSucess, setShowSucess] = useState(false)
   const [showError, setShowError] = useState(false)
   const [inviteRoleName, setInviteRoleName] = useState('')

  return (
    <div>
     {showSucess &&  <GreenAlert AletTitle='Success: ' alertText=' User invitation sent'  showAlert={showSucess} setShowAlert={setShowSucess} />}
     {showError &&  <RedAlert AletTitle='Error: ' alertText=' Please enter both email and role to invite user' showAlert={showError} setShowAlert={setShowError} />}
      {user && company ? (
        <>
          {editCompany &&
            <form className="p-6 rounded-lg shadow-md  flex flex-col items-center justify-center flex-wrap">
              <CompanyInfo companyType={companyType} setCompanyType={setCompanyType} />
              <div className='flex space-x-20'>
                <ButtonShort type="button" onClick={cancelEdit} text="Cancel" />
                <ButtonShort type="submit" onClick={handleSubmitCompany} text="Update" />
              </div>
            </form>}
          {EditAddress &&
            <form className="p-6 rounded-lg shadow-md  flex flex-col items-center justify-center flex-wrap">
              <CompanyAddress companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} />
              <div className='flex space-x-20'>
                <ButtonShort type="button" onClick={cancelEdit} text="Cancel" />
                <ButtonShort type='submit' onClick={handleSubmitAddress} text="Update" />
              </div>
            </form>}

          {showInfo && <div className="container mx-auto mt-20">
            <div>
              {user && company && (

                <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">

                  <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{user.name}</h1>
                    <p className="text-center text-xl text-gray-900">{user.role} account</p>
                    <p>
                      <span>

                      </span>
                    </p>

                    {/* **************************  CODE SNIPPET  *************************** */}
                    <form onSubmit={inviteUser}>
                      <div className="w-full flex md:flex-row flex-col px-4 py-2 space-y-2 justify-around">
                        <div>
                          <input
                            placeholder='enter email address'
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            id="emailAddress" type="email" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#9FDF97] focus:border-[#9FDF97] block w-full p-2.5" />
                        </div>

                        <div>
                          <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5">
                            <option defaultValue="">Choose a Role</option>
                            <option value={company.admin_code?.toString()}>ADMIN</option>
                            <option value={company.user_code?.toString()}>USER</option>

                          </select>
                        </div>
                        <ButtonWithLoader loading={loading} name="Invite" />
                    
                      </div>
                    </form>


                    <div className="flex justify-between items-center my-5 px-6">
                    </div>

                    <div className="w-full">

                      <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                        <div className="flex justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                          <div className='flex flex-col gap-2'>
                            <p>Company: <span className="font-bold">{company.company}</span></p>
                            <p> Company type: <span className="font-bold py-4">{company.company_type}</span></p>
                            <p> Email: <span className="font-bold py-4">{company.email}</span></p>
                            <p> Phone: <span className="font-bold py-4">{company.phone}</span></p>
                          </div>

                          {user.role === "ROOT" && <CiEdit onClick={handleEditCompany} className="text-2xl hover:text-[#80CF76]" />}

                        </div>


                        <div className="flex justify-between w-full border-t border-gray`-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                          <div>
                            <p>Address: <span className="font-bold">{company.address_line_1}  </span></p>
                            <p className="font-bold">{company.address_line_2}  </p>
                            {/* ?? return city if city is not null, else return empty string. fall back syntax*/}
                            {/* casting the type to the variable city as Prisma.CitySelect */}
                            {/* pretend the type is Prisma.CitySelect */}
                            <p className="font-bold">{(company.city as Prisma.CitySelect)?.city ?? ""}</p>
                            <p className="font-bold">{company.zip_code}</p>
                            <p className="font-bold">{companyAddress.province}</p>
                          </div>
                          {user.role === "ROOT" && <CiEdit onClick={handleEditAddress} className="text-2xl hover:text-[#80CF76]" />}
                        </div>

                        {user.role === "ROOT" &&
                          <>
                            <div className="flex justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                              <p>Admin code: <span className="font-bold">{company.admin_code}</span></p>

                              <RxUpdate onClick={handleUpdateAdminCode} className="text-xl hover:text-[#80CF76]" />
                            </div>

                            <div className="flex justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                              <p>User code: <span className="font-bold">{company.user_code}</span></p>

                              <RxUpdate onClick={handleUpdateUserCode} className="text-xl hover:text-[#80CF76]" />
                            </div>
                          </>
                        }

                        <ButtonShort text="Sign Out" onClick={() => {
                          signOut()
                        }} />

                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>}
        </>
      ) : <Loader />}

    </div>

  )

}
