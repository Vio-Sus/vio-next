import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ButtonShort from '../button/ButtonShort';
import { signOut } from 'next-auth/react'



export default function Profile() {
  // query user data from api
  const [user, setUser] = useState();
  const [company, setCompany] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/account/user');
        setUser(response.data.user);
        setCompany(response.data.company);
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

  return (
    <div>
      <div className="container mx-auto my-60">
        <div>
          {user && company && (

            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">


              <p className="ont-bold text-center text-3xl text-gray-900">{user.role} account</p>

              <div className="mt-16">
                <h1 className="font-bold text-center text-3xl text-gray-900">{user.name}</h1>
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
                    <a className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                      Company: <span className="font-bold">{company.company}</span>
                    </a>

                    <div className="w-full border-t border-gray`-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                      Address: <p className="font-bold">{company.address_line_1}  </p>
                      <p className="font-bold">{company.address_line_2}  </p>
                      <p className="font-bold">{company.city.city}  </p>
                      <p className="font-bold">{company.zip_code}  </p>
                    </div>

                    {user.role === "ROOT" &&
                      <>
                        <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                          Admin code: <p className="font-bold">{company.admin_code}</p>
                        </div>

                        <div className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                          User code: <p className="font-bold">{company.user_code}</p>
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
      </div>


    </div>

  )

}
