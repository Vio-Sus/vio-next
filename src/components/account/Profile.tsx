import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonShort from '../button/ButtonShort';
import { signOut } from 'next-auth/react'
import CompanyAddress from './StepForm/CompanyAddress'
import CompanyInfo from './StepForm/CompanyInfo'
import { Prisma } from '@prisma/client';
import { CiEdit } from 'react-icons/ci'
import { RxUpdate } from 'react-icons/rx'



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
        task:"info"
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
        task:"address"
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



  return (
    <div>
      {editCompany &&
        <form className="p-6 rounded-lg shadow-md  flex flex-col items-center justify-center flex-wrap">
          <CompanyInfo companyType={companyType} setCompanyType={setCompanyType} />
          <ButtonShort type="submit" onClick={handleSubmitCompany} text="Update" />
        </form>}
      {EditAddress &&
        <form className="p-6 rounded-lg shadow-md  flex flex-col items-center justify-center flex-wrap">
          <CompanyAddress companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} />
          <ButtonShort type='submit' onClick={handleSubmitAddress} text="Update" />
        </form>}

      {showInfo && <div className="container mx-auto mt-20">
        <div>
          {user && company && (

            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">


              {/* <p className="ont-bold text-center text-3xl text-gray-900">{user.role} account</p> */}

              <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-900">{user.name}</h1>
                <p className="text-center text-xl text-gray-900">{user.role} account</p>
                <p>
                  <span>

                  </span>
                </p>
                {/* <div className="flex justify-between items-center my-5 px-6">
                  <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Facebook</a>
                  <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Twitter</a>
                  <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Instagram</a>
                  <a href="" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Email</a>
                </div> */}

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


    </div>

  )

}
