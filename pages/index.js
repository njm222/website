import Layout from '../components/layout';
import Hero from '../components/home/hero';
import Loading from '../components/home/loading';
import Intro from '../components/home/intro';
import Libs from '../components/home/libs';
import Numbers from '../components/home/numbers';

export default function Index() {
  return (
    <>
      <Layout pageTitle="Poimandres">
        <Loading />
        <Hero />
        <Intro />
        <Libs />
        <Numbers />
      </Layout>
    </>
  );
}
