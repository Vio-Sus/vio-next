import React from 'react';
import { useRouter } from 'next/router';
import { Navbar } from './header';
// import Footer from './footer'
import { useSession } from 'next-auth/react'
import axios from 'axios'

interface Props {
  children: React.ReactNode;
  session: any;
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status === "loading") {
    return <div>loading</div>
  } else if (status === "unauthenticated") {
    // window.location.href = "/auth/SignIn"
    router.push("/auth/SignIn")
  }
  return (
    <>
    {/* <SessionProvider session={session}> */}
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/existing' },
        { label: 'New Entry', href: '/entry' },
        { label: 'Account', href: '/account' }

      ]} logoSrc="/logo.png" username="username" />
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
