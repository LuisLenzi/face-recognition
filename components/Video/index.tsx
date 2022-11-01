/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect } from "react";

import { BiAngry, BiHappy, BiSad } from "react-icons/bi";
import { FaRegDizzy, FaRegSurprise } from "react-icons/fa";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { useVideoDetection } from "../../hooks/useVideoDetection";

import styles from "./Video.module.scss";

export default function VideoComponent() {
  const { detect, videoRef, canvasRef, loadModels, faceExpression } =
    useVideoDetection();

  const handleLoadModels = useCallback(async () => {
    await loadModels();
  }, [loadModels]);

  useEffect(() => {
    handleLoadModels();
  }, [detect]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  const getEmojiExpression = useCallback(() => {
    if (faceExpression) {
      const { key } = faceExpression;

      switch (key) {
        case "Triste":
          return <BiSad size={25} />;
        case "Bravo":
          return <BiAngry size={25} />;
        case "Feliz":
          return <BiHappy size={25} />;
        case "Neutro":
          return <MdOutlineSentimentNeutral size={25} />;
        case "Com medo":
          return <FaRegDizzy size={25} />;
        case "Surpreso":
          return <FaRegSurprise size={25} />;
        case "Repugnado":
          return <FaRegDizzy size={25} />;
        default:
          return <MdOutlineSentimentNeutral size={25} />;
      }
    }
  }, [faceExpression]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <canvas ref={canvasRef} className={styles.canvas} />

          <video
            src="/assets/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={700}
            height={375}
            ref={videoRef}
            className={styles.gif}
          />
        </div>
      </div>
    </section>
  );
}
