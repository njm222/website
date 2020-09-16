import Head from 'next/head';
import Footer from './footer';
import Header from './header';
import Background from './background';

function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header />

      <main>{children}</main>

      <Background />
      {/* <Cursor /> */}
      <Footer />
    </>
  );
}

export default Layout;
