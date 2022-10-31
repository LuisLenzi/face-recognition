import Head from "next/head";

import styles from "../styles/NotFound.module.scss";

const TITLE = "404";

const SUBTITLE = "Página não encontrada";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Página não encontrada</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Página não encontrada" />
      </Head>

      <div className={styles.titles}>
        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.subtitle}>{SUBTITLE}</p>
      </div>
    </div>
  );
}
