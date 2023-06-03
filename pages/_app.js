import '@/styles/globals.css'
import {Head} from "next/document";

export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <link rel="icon" href="/images/favicon.svg" />
        <title>StudAI</title>
      </Head>
      <Component {...pageProps} />
    </>
}
