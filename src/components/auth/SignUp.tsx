import React, { useEffect } from 'react';
import Input from '../box/Input'
import ButtonPrimary from '../button/ButtonPrimary';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image';

export default function SignUp() {
    const router = useRouter();
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setconfirmPassword] = useState("");

    const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "authenticated") {
          const fetchPrismaUser = async () => {
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
          };
    
          fetchPrismaUser();
        }
      }, [status]);


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return;
        }
        const result = await axios.post('/api/register', {
            firstName,
            lastName,
            email,
            password,
        }).then((res) => {
            console.log(res);
            const user = res.data;
            signIn('credentials', {
                email: user.email,
                password: password,
                redirect: true
            })
        }).catch((err) => {
            console.log(err);
        }
        )
    }
    function clickGoogleSignUp() {
        signIn('google');
    }

    return (
        <>
            <section className="bg-[#C7F2FE] py-0 md:py-10">
                <div className="flex flex-col min-h-screen items-center justify-center md:px-6 md:py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
                            <Image
                                width={100}
                                height={100}
                                src="/Logo.png"
                                className="w-36 mx-auto"
                                alt="logo image" />

                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl">
                                Create an account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <Input type='text' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                                <Input type='text' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                                <Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Your Email' />
                                <Input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                                <Input type='password' onChange={(e) => setconfirmPassword(e.target.value)} placeholder='Confirm Password' />
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <ButtonPrimary onClick={handleSubmit} children='Create an account' />

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/auth/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                <p className="text-center font-semibold mx-4 mb-0">OR</p>
                            </div>

                            <div onClick={clickGoogleSignUp} className="pl-6 grid grid-cols-[20%_80%] py-3 text-dark font-medium rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3">
                                <FcGoogle size="1.7rem" />
                                Continue with Google</div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}