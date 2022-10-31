import Head from "next/head";

import Video from "../../components/Video";

import styles from "./FaceDetection.module.scss";

const TITLE = "Detecção de Faces";
const SUBTITLE = "Reconhecimento de Expressões Faciais";

export default function FaceDetection() {
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

      <div className={styles.content}>
        <Video />
      </div>
    </div>
  );
}
