import { Html, Head, Main, NextScript } from 'next/document'
import {Title} from "@mui/icons-material";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link rel="icon" href="/images/favicon.svg" />
            <Title>StudAI</Title>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}
