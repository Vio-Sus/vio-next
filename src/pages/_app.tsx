import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
 const router = useRouter()

  return (
    <SessionProvider session={pageProps.session}>
      {router.pathname === '/auth/SignIn' || router.pathname ==='/auth/SignUp' ? (
        <Component {...pageProps} />
      ) : (
        <Layout session={pageProps.session}>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
  
}
