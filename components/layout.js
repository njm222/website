import Head from 'next/head';
import Footer from './footer';
import Header from './header';

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
