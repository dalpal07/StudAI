import {Head} from "next/document";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} >
      <Head>
        <link rel="icon" href="/images/favicon.svg" />
        <title>StudAI</title>
      </Head>
    </Component>
}
