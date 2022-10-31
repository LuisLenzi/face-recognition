import Head from "next/head";

import styles from "./ImageDetection.module.scss";

const TITLE = "Image Detection";
const SUBTITLE = "Reconhecimento de Imagens";

export default function ImageDetection() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Face Detection</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Face Detection" />
      </Head>

      <div className={styles.titles}>
        <h1 className={styles.title}>{TITLE}</h1>
        <p className={styles.subtitle}>{SUBTITLE}</p>
      </div>

      <div className={styles.content}></div>
    </div>
  );
}
