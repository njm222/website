import Head from 'next/head';
import Footer from './footer';
import Header from './header';
import Background from './background';
import Cursor from './cursor';

function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header />

      <main>{children}</main>
      <style jsx>{`
        main {
          z-index: 1;
        }
      `}</style>

      <Background />
      <Cursor />
      <Footer />
    </>
  );
}

export default Layout;
