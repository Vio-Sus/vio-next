import React from 'react';
import { Navbar } from './header';
// import {SessionProvider} from 'next-auth/react'
// import Footer from './footer'

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {

  return (
    <>
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/details' },
        { label: 'New Entry', href: '/entry' },
      ]} logoSrc="/logo.png" username ="username"/>
      <main className="flex justify-center">
        <div className="w-3/4">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
