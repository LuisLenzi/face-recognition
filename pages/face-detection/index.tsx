/* eslint-disable react-hooks/exhaustive-deps */

import Head from "next/head";

import { useEffect } from "react";

import { FaRegDizzy } from "react-icons/fa";
import { FaRegSurprise } from "react-icons/fa";
import { BiSad, BiHappy, BiAngry } from "react-icons/bi";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { useFaceDetection } from "../../hooks/useFaceDetection";

import Video from "../../components/Video";

import styles from "./FaceDetection.module.scss";

const TITLE = "Face Detection";
const SUBTITLE = "Reconhecimento de Expressões Faciais";

export default function FaceDetection() {
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

      <div className={styles.content}>
        <Video />
      </div>
    </div>
  );
}
