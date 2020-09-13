import Layout from '../components/layout';
import Hero from '../components/hero';
import Intro from '../components/intro';

export default function Index() {
  return (
    <>
      <Layout pageTitle="Poimandres">
        <Hero />
        <Intro />
      </Layout>
    </>
  );
}
