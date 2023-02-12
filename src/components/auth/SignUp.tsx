import React from 'react';
import Input from '../box/Input'
import ButtonPrimary from '../button/ButtonPrimary';
import { FcGoogle } from 'react-icons/fc';
export default function SignUp() {
    return (
        <>
            <section className="bg-[#C7F2FE] ">
                <div className="flex flex-col items-center justify-center md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                                <img
                                    src="/logo.png"
                                    className="w-36 mx-auto"
                                    alt="logo image" />
                          
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                    <Input type='text' placeholder='First Name'/>
                                    <Input type='text' placeholder='Last Name'/>
                                    <Input type='email' placeholder='Your Email'/>
                                    <Input type='password' placeholder='Password'/>
                                    <Input type='password' placeholder='Confirm Password'/>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <ButtonPrimary children='Create an account'/>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                            <div
                                        className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                        <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                    </div>

                                    <a className="pl-6 grid grid-cols-[20%_80%] py-3 text-dark font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                                               <FcGoogle size="1.7rem" />
                                        Continue with Google</a>
                                 
                                    <a className="grid grid-cols-[20%_80%] px-7 py-3 text-dark font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    >
                                        <img src="/ms.svg"  alt="microsoft" className="w-5 h-5 " />
                                        Continue with Microsoft
                                    </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}