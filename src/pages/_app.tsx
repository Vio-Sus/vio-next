import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
  // login page no need layout
  if (Component.name === 'SignIn') {
    return <Component {...pageProps} />;
  }
  return <Layout><Component {...pageProps} /></Layout>;
}
