import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  // login page no need layout
  if (Component.name === "SignIn" || Component.name === "SignUp") {
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Layout session={pageProps.session}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}
