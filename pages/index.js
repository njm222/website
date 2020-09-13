import Layout from '../components/layout';
import Header from '../components/header';
import Hero from '../components/hero';
import Intro from '../components/intro';

export default function Index() {
  return (
    <>
      <Layout pageTitle="Poimandres">
        <Header />
        <Hero />
        <Intro />
      </Layout>
    </>
  );
}
