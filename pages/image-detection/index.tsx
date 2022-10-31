import Head from "next/head";

import styles from "./ImageDetection.module.scss";

const TITLE = "Detecção de Imagens";
const SUBTITLE = "Reconhecimento de Imagens";

export default function ImageDetection() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={SUBTITLE} />
      </Head>

      <div className={styles.titles}>
        <p className={styles.subtitle}>{SUBTITLE}</p>
        <h1 className={styles.title}>{TITLE}</h1>
      </div>

      <div className={styles.content}></div>
    </div>
  );
}
