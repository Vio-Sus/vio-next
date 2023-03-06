import Link from "next/link"
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
    links: { label: string; href: string }[];
    logoSrc: string;
    username: string;
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

function closeMenu() {
    const navMenu = document.querySelector('#mobile-menu');
    navMenu?.classList.add('hidden');
}

const Navbar: React.FC<Props> = ({ links, logoSrc }) => {
    
    return (
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
                                <a href="/">
                                    <img className="hidden h-8 w-auto lg:block" src={logoSrc} alt="Your Company" />
                                </a>
                                <img className="block h-8 w-auto lg:hidden " src={logoSrc} alt="Your Company" />
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
                    </div>
                </div>

                <div className="hidden md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        {links.map(({ label, href }) => (
                            <Link key={label} href={href}>
                                <div
                                onClick={closeMenu}
                                    className={isCurrentPage(href) ? "bg-[#80CF76] text-white px-3 py-2 rounded-md text-lg font-medium my-2" : "text-dark hover:bg-[#80CF76] hover:text-white px-3 py-2 rounded-md text-lg font-medium "}>
                                    {label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </nav>
        </div>
    )

};

export default Navbar;
