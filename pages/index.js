import Layout from '../components/layout';
import Hero from '../components/hero';
import Loading from '../components/loading';
import Intro from '../components/intro';
import Libs from '../components/libs';
import Numbers from '../components/numbers';

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
