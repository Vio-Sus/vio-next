import React, { FormEventHandler } from 'react';
import { FcGoogle } from 'react-icons/fc';
import ButtonPrimary from '../button/ButtonPrimary';
import Input from '../box/Input'
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
export default function Login() {
    const router = useRouter();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const { data: session, status } = useSession()

    if (session) {
        console.log(session)
    } else {
        console.log("no session")
    }

    useEffect(() => {
        if (status === "authenticated") {
            (async () => {
                try {
                    const res = await axios.get("/api/account/check-temp-user");
                    console.log(res.data);
                    if (res.data.role === "TEMP_") {
                        router.push("/create-role");
                    } else {
                        router.push("/");
                    }
                } catch (err) {
                    console.log(err);
                }
            })()
        }
    }, [status]);



    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");
        }
        signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        })
    }

    function clickGoogleSignUp() {
        signIn('google');
    }


    return (
        <>
            <section className="bg-[#C7F2FE] py-0 md:py-10  ">
                <div className="flex  flex-col min-h-screen  items-center justify-center md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">

                                <Image
                                    width={100}
                                    height={100}
                                    src="/Logo.png"
                                    className="w-36 mx-auto"
                                    alt="logo image" />

                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                                    Welcome
                                </h1>
                                <div className='mx-2.5 text-center'> Log in to Vio Sustainability to continue to Waste Tracking App</div>
                            </div>

                            <form className="md:space-y-6" action="#">
                                <Input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder='Your Email' />
                                <Input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />

                                <div className="flex items-between relative">
                                    <div className="flex items-center h-5">
                                        <input id="saveAccount" aria-describedby="saveAccount" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 font-medium">
                                        <label htmlFor="saveAccount">Remember me</label>
                                    </div>
                                    <a className="font-medium text-blue-600 hover:underline absolute right-0 " href="#">Forgot Password?</a>
                                </div>


                                <ButtonPrimary onClick={handleSubmit} children={'Log In'} />

                                <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                    Do not have an account? <Link href="/auth/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</Link>
                                </p>
                            </form>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">

                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                            <a onClick={clickGoogleSignUp} className="pl-6 grid grid-cols-[20%_80%] py-3 text-dark font-medium  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                                <FcGoogle size="1.7rem" />
                                Continue with Google</a>

                            {/* <a onClick={clickMicrosoftSignUp} className="pl-6 grid grid-cols-[20%_80%] py-3 text-dark font-medium  rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                                <FcGoogle size="1.7rem" />
                                Continue with Microsoft</a> */}
                            {/* <a
                                href={`/api/auth/signin`}

                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn();
                                }}
                            >
                                Sign in
                            </a> */}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
