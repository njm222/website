import '../styles/tailwind.css';
import '../styles/index.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
