import Layout from '../components/layout';
import Hero from '../components/hero';
import Header from '../components/header';
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
