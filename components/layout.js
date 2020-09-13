import Head from 'next/head';
import Footer from './footer';
import Header from './header';
import Background from './background';
import Cursor from './cursor';

export default function Layout({ children, pageTitle, ...props }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Header />

      <main
        css={`
          z-index: 1;
        `}>
        {children}
      </main>
      <Background />
      <Cursor />
      <Footer />
    </>
  );
}
