import Head from "next/head";

import Image from "next/image";

import styles from "../styles/Dashboard.module.scss";

const TITLE = "Face Recognition";

const SUBTITLE = "Computação Cognitiva";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Face Recognition</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Face Recognition" />
      </Head>

      <div className={styles.titles}>
        <p className={styles.subtitle}>{SUBTITLE}</p>
        <h1 className={styles.title}>{TITLE}</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.images}>
          <Image
            src="/assets/luis.png"
            alt="Luis Lenzi"
            width={250}
            height={375}
            className={styles.image}
          />
        </div>
        <div className={styles.images}>
          <Image
            src="/assets/victor.png"
            alt="Victor Bento"
            width={250}
            height={375}
            className={styles.image}
          />
          <Image
            src="/assets/hugo.png"
            alt="Hugo Massote"
            width={250}
            height={375}
            className={styles.image}
          />
        </div>
        <div className={styles.images}>
          <Image
            src="/assets/guilherme.png"
            alt="Guilherme Cruz"
            width={250}
            height={375}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
}
