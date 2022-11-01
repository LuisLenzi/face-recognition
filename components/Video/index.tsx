/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef } from "react";

import { useVideoDetection } from "../../hooks/useVideoDetection";

import styles from "./Video.module.scss";

export default function VideoComponent() {
  const {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    handleGetVideoRefs,
    handleGetCanvasRefs,
  } = useVideoDetection();

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);

  const handleLoadModels = useCallback(async () => {
    await loadModels();
  }, [loadModels]);

  useEffect(() => {
    handleLoadModels();

    handleGetVideoRefs([
      videoRef1.current as HTMLVideoElement,
      videoRef2.current as HTMLVideoElement,
    ]);

    handleGetCanvasRefs([
      canvasRef1.current as HTMLCanvasElement,
      canvasRef2.current as HTMLCanvasElement,
    ]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <canvas ref={canvasRef1} className={styles.canvas} />

          <video
            src="/assets/video2.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={750}
            height={425}
            ref={videoRef1}
            className={styles.gif}
          />
        </div>
        <div className={styles.card}>
          <canvas ref={canvasRef2} className={styles.canvas} />

          <video
            src="/assets/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            width={750}
            height={425}
            ref={videoRef2}
            className={styles.gif}
          />
        </div>
      </div>
    </section>
  );
}
