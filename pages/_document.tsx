import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.svg" />
          <link rel="apple-touch-icon" href="/favicon.svg" />

          <meta name="robots" content="index, follow" />
          <meta
            name="description"
            content="Face Recognition - A simple face recognition app"
          />
          <meta
            name="keywords"
            content="face, recognition, app, nextjs, react, typescript, face-api.js"
          />
          <meta property="og:locale" content="pt_br" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta property="title" content="Face Recognition App" />
          <meta property="og:title" content="Face Recognition App" />
          <meta property="og:site_name" content="Face Recognition App" />
          <meta
            property="og:url"
            content="https://face-recognition-woad.vercel.app"
          />
          <meta
            property="og:url"
            content="https://face-recognition-woad.vercel.app"
          />
          <meta
            property="url"
            content="https://face-recognition-woad.vercel.app"
          />
          <meta
            property="url"
            content="https://face-recognition-woad.vercel.app"
          />
          <meta property="image" content="/favicon.svg" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
