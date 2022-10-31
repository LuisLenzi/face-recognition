import Head from "next/head";

import Image from "next/image";

import styles from "../styles/Dashboard.module.scss";

const TITLE = "Face Recognition";

const SUBTITLE = "Computação Cognitiva";

export default function Dashboard() {
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
        <div className={styles.images}>
          <Image
            src="/assets/1.png"
            alt="Face Detection 1"
            width={250}
            height={375}
            className={styles.image1}
            quality={50}
          />
        </div>
        <div className={styles.images}>
          <Image
            src="/assets/2.png"
            alt="Face Detection 2"
            width={250}
            height={375}
            className={styles.image2}
            quality={50}
          />
          <Image
            src="/assets/3.png"
            alt="Face Detection 3"
            width={250}
            height={375}
            className={styles.image3}
            quality={50}
          />
        </div>
        <div className={styles.images}>
          <Image
            src="/assets/4.png"
            alt="Face Detection 4"
            width={250}
            height={375}
            className={styles.image4}
            quality={50}
          />
        </div>
      </div>
    </div>
  );
}
