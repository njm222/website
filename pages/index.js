import Layout from '../components/layout';
import Hero from '../components/home/hero';
import Intro from '../components/home/intro';
import Libs from '../components/home/libs';

export default function Index() {
  return (
    <>
      <Layout pageTitle="Poimandres">
        <Hero />
        <Intro />
        <Libs />
      </Layout>
    </>
  );
}
