import Head from 'next/head'

interface Props {
    title: string;
  }
  
  const PageHead: React.FC<Props> = ({ title }) => (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
     <link rel="icon" href="/Logo.png"/>
    </Head>
  );
  
  export default PageHead;