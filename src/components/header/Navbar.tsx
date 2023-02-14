import Link from "next/link"
import { usePathname } from 'next/navigation';
import { FaUser } from 'react-icons/fa'
import React, { useEffect } from 'react';
import {getSession, signIn, signOut, useSession} from 'next-auth/react'
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";


interface Props {
    links: { label: string; href: string }[];
    logoSrc: string;
    username: string;
    session: any;
}


const isCurrentPage = (href: string) => {
    const pathname = usePathname();
    const currentPath = pathname
    return currentPath === href
}

function toggleHamburger() {
    const navMenu = document.querySelector('#mobile-menu');
    navMenu?.classList.toggle('hidden');
}




const Navbar: React.FC<Props> = ({ links, logoSrc, username, session }) => (




    <div>
        <nav className="bg-[#e1eedd]">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 right-0 flex items-center md:hidden">

                        <button onClick={toggleHamburger} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-dark-400 hover:bg-white-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto lg:hidden " src={logoSrc} alt="Your Company" />
                            <img className="hidden h-8 w-auto lg:block" src={logoSrc} alt="Your Company" />
                        </div>
                        <div className="hidden md:ml-6 md:block">
                            <div className="flex space-x-4">
                                {links.map(({ label, href }) => (
                                    <Link key={label} href={href}>
                                        <div
                                            className={isCurrentPage(href) ? "bg-[#80CF76] text-white px-3 py-2 rounded-md mt-1" : "text-dark hover:bg-[#80CF76] border border-[#e1eedd] hover:border-green-50 hover:text-white px-3 py-2 rounded-md text-lg font-medium "}>
                                            {label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {!session ? (
                    <button className='hidden p-2 border border-black hover:border-green-50 rounded-lg ml-2 md:block' onClick={() => {signIn()}}>Sign innn</button>
                    ) : (
                    <button className='hidden p-2 border border-black hover:border-green-50 rounded-lg ml-2 md:block' onClick={() => {signOut()}}>Sign out</button>
                    )}


                </div>
            </div>

            <div className="hidden md:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    {links.map(({ label, href }) => (
                        <Link key={label} href={href}>
                            <div
                                className={isCurrentPage(href) ? "bg-[#80CF76] text-white px-3 py-2 rounded-md text-lg font-medium my-2" : "text-dark hover:bg-[#80CF76] hover:text-white px-3 py-2 rounded-md text-lg font-medium "}>
                                {label}
                            </div>
                        </Link>
                    ))}
                    <button className=' text-dark hover:bg-[#80CF76] hover:text-white px-3 py-2 rounded-md text-lg font-medium '>sign out</button>
                </div>
            </div>

        </nav>
    </div>

);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await getServerSession();
    // if (!session) {
    //     // res.writeHead(302, { Location: '/login' });
    //     console.log("NO session")
    //     res.end();
    //     return { props: {} };
    // }
    console.log("SESSION", session)
    return {
        props: {
            session,
        },
    };
};


export default Navbar;
