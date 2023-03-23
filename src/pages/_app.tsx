import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }: AppProps) {
 
  return (
    <SessionProvider session={pageProps.session}>
      {Component.name === "SignIn" || Component.name === "SignUp" ? (
        <Component {...pageProps} />
      ) : (
        <Layout session={pageProps.session}>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
  
}
