import Layout from '../components/layout';
import Intro from '../components/intro/intro';
import Home from '../components/home/home';

export default function Index() {
  return (
    <>
      <Layout pageTitle="Poimandres">
        {/* intro animation */}
        <Intro />

        {/* page content */}
        <Home />
      </Layout>
    </>
  );
}
