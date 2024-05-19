import "../styles/main.scss";
import Head from "next/head";
import Context from "../components/context";
import Container from "../components/container";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sticker Trader</title>
      </Head>
      <Context>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Context>
    </>
  );
}

export default MyApp;
