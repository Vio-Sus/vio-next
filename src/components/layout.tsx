import React, { useEffect } from 'react';
import { Navbar } from './header';
// import Footer from './footer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import axios from 'axios';
interface Props {
  children: React.ReactNode;
  session: any;
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "authenticated") {
      const fetchPrismaUser = async () => {
        try {
          const res = await axios.get("/api/account/check-temp-user");
          if (res.data.role === "TEMP_") {
            router.push("/create-role");
          } else {
           return
          }
        } catch (err) {
          console.log("error on layout.tsx line 26")
          console.log(err);
        }
      };

      fetchPrismaUser();
    } else if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "loading") 
    {
      <div>loading</div>
    }
  }, [status]);


  return (
    <>
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/existing' },
        { label: 'New Entry', href: '/entry' },
        { label: 'Account', href: '/account' }

      ]} logoSrc="/Logo.png" username="username" />
      <main className="flex justify-center">
        <div className="w-3/4">
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}