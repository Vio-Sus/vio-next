import "@/styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (
    router.pathname === "/auth/signin" ||
    router.pathname === "/auth/signup"
  ) {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={pageProps.session}>
        <Layout session={pageProps.session}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}
