import Head from "next/head";
import ImageComponent from "../../components/Image";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <div className={styles.titles}>
        <p className={styles.subtitle}>{SUBTITLE}</p>
        <h1 className={styles.title}>{TITLE}</h1>
      </div>

      <div className={styles.content}>
        <ImageComponent />
      </div>
    </div>
  );
}
