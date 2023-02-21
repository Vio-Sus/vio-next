import React from 'react';
import { Navbar } from './header';
import {SessionProvider} from 'next-auth/react'
// import Footer from './footer'

interface Props {
  children: React.ReactNode;
  session: any;
}

export default function Layout({ children }: Props) {

  return (
    <>
    {/* <SessionProvider session={session}> */}
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/details' },
        { label: 'New Entry', href: '/entry' },
      ]} logoSrc="/logo.png" username ="username"/>
      {/* session={session} */}

      // center main content
      <main className="flex justify-center">
        <div className="w-3/4">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
      {/* </SessionProvider> */}
    </>
  );
}
