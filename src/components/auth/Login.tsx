import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import ButtonPrimary from '../button/ButtonPrimary';
import Input from '../box/Input'
import { signIn } from 'next-auth/react';
import axios from "axios";
import { useState } from 'react';


export default function Login() {

let [email, setEmail] = useState("");
let [password, setPassword] = useState("");



// send user data to the server to be authenticated
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const result = await axios.post('/api/login', {
            email,
            password,
        })
        .then((res) => {
            console.log("res", res)
            return res

            // signIn('credentials', {
            //     email: res.data.email,
            //     password: res.data.password,
            //     callbackUrl: '/',
                // redirect: true,
            // })

            // if (res.status === 200) {
            //     window.location.href = "/"
                
            // }

        })
        .catch((err) => {
            console.log(err)
        })
        console.log("email", email)

        console.log("result: ", result)

        // sign user in with credentials
        signIn('credentials', {
            email: result?.data.userCheck.email,
            password: result?.data.userCheck.password,
            callbackUrl: '/',
            redirect: true,
        })

      }





    return (
        <>
            <section className="bg-[#C7F2FE] ">
                <div className="flex flex-col items-center justify-center md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">

                                <img
                                    src="/logo.png"
                                    className="w-36 mx-auto"
                                    alt="logo image" />

                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                                    Welcome
                                </h1>
                                <div className='mx-2.5 text-center'> Log in to Vio Sustainability to continue to Waste Tracking App</div>
                            </div>
                            <form className="md:space-y-6" action="#">

                                <Input type='email' onChange={(e) => {setEmail(e.target.value)}} placeholder='Your Email' />
                                <Input type='password' onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />
                                <div className="flex items-between relative">
                                    <div className="flex items-center h-5">
                                        <input id="saveAccount" aria-describedby="saveAccount" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 font-medium">
                                        <label htmlFor="saveAccount">Remember me</label>
                                    </div>
                                    <a className="font-medium text-blue-600 hover:underline absolute right-0 " href="#">Forgot Password?</a>
                                </div>

                                
                                <ButtonPrimary onClick={handleSubmit} children='Log In' />

                                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                            <a className="pl-6 grid grid-cols-[20%_80%] py-3 text-dark font-medium  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                                <FcGoogle size="1.7rem" />
                                Continue with Google</a>

                            <a className="grid grid-cols-[20%_80%] px-7 py-3 text-dark font-medium  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                            >
                                <img src="/ms.svg" alt="microsoft" className="w-5 h-5 " />
                                Continue with Microsoft
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}



// const result = await signIn("credentials", {
//     username: "murad@abc.com",
//     password: "1234",
//     redirect: true,
//     callbackUrl: "/",
//   });
// const result = await signIn("credentials", {
//     username: "murad@abc.com",
//     password: "1234",
//     redirect: true,
//     callbackUrl: "/",
//   });
//   if (result?.error) {
//     console.log("ERROR", result.error)
//   }
//   console.log("RESULT", result)