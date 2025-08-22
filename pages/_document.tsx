import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Sushrut Health - Your intelligent co-pilot for clinical decision-making" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
