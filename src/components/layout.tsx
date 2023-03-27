import React, { useEffect, useState} from 'react';
import { Navbar } from './header';
import Loader from './loader/Loader';
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
          console.log(err);
        }
      };

      fetchPrismaUser();
    } else if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "loading") return
    {
      <div>loading</div>
    }
  }, [status]);

  const [isLoading, setIsLoading] = useState(true);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setShowChildren(true);
    }, 2000);
  }, []);

  return (
    <>
      <Navbar links={[
        { label: 'Collection Summaries', href: '/' },
        { label: 'Collection Details', href: '/existing' },
        { label: 'New Entry', href: '/entry' },
        { label: 'Account', href: '/account' }
      ]} logoSrc="/Logo.png" username="username" />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="flex justify-center">
          <div className="w-3/4">
            {showChildren ? (
             children
            ) : (
              // Placeholder content while loading
              <h1>Loading children...</h1>
            )}
          </div>
        </main>
      )}
      {/* <Footer /> */}
    </>
  );
}