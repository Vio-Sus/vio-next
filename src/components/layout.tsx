import React from 'react';
import { Navbar } from './header';
// import Footer from './footer'

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/deatails' },
        { label: 'New Entry', href: '/entry' },
      ]} logoSrc="/logo.png" username ="username"/>
      // center main content
      <main className="flex justify-center">
        <div className="w-3/4">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
