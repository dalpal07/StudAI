import { Html, Head, Main, NextScript } from 'next/document'
import AppHead from "@/public/components/AppHead";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <AppHead/>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}
