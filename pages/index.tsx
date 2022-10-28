import Head from "next/head";

import { useCallback, useEffect, useState } from "react";

import Button from "../components/Button";

import { FaceExpressions } from "face-api.js";

import { FaRegDizzy } from "react-icons/fa";
import { FaRegSurprise } from "react-icons/fa";
import { BsCameraVideoOff } from "react-icons/bs";
import { BiSad, BiHappy, BiAngry } from "react-icons/bi";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { useFaceDetection } from "../hooks/useFaceDetection";

import styles from "../styles/Home.module.scss";

export default function Home() {
  const {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    startVideo,
    faceExpression,
  } = useFaceDetection();

  useEffect(() => {
    loadModels();
  }, [loadModels]);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  const [isVideoOn, setIsVideoOn] = useState(false);

  const handleVideo = useCallback(async () => {
    setIsVideoOn(!isVideoOn);

    if (!isVideoOn) {
      await startVideo();
    }

    if (isVideoOn && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [isVideoOn, startVideo, videoRef]);

  const handleGetExpression = useCallback((expressions: FaceExpressions) => {
    const expression = Object.entries(expressions).reduce(
      (prev, [key, value]) => {
        if (value > prev.value) {
          return { key, value };
        }
        return prev;
      },
      { key: "", value: 0 }
    );

    const translateToPortuguese = {
      sad: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Triste <BiSad size={20} color="var(--white-solid)" />
        </p>
      ),
      happy: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Feliz <BiHappy size={20} color="var(--white-solid)" />
        </p>
      ),
      angry: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Bravo <BiAngry size={20} color="var(--white-solid)" />
        </p>
      ),
      neutral: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Neutro{" "}
          <MdOutlineSentimentNeutral size={20} color="var(--white-solid)" />
        </p>
      ),
      fearful: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Com medo <FaRegDizzy size={20} color="var(--white-solid)" />
        </p>
      ),
      surprised: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Surpreso <FaRegSurprise size={20} color="var(--white-solid)" />
        </p>
      ),
      disgusted: (
        <p
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          Repugnado <BiSad size={20} color="var(--white-solid)" />
        </p>
      ),
      asSortedArray: [],
    };

    return translateToPortuguese[expression.key as keyof FaceExpressions];
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Face Recognition</title>
        <meta name="description" content="Face Recognition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Face Recognition</h1>

        <div className={styles.content}>
          <div className={styles.card}>
            {!isVideoOn && (
              <BsCameraVideoOff
                size={75}
                color="var(--light-white-solid)"
                className={styles.icon}
                style={{
                  position: "absolute",
                }}
              />
            )}
            <video
              ref={videoRef}
              muted
              autoPlay
              width="500"
              height="375"
              onPlay={detect}
              style={{
                border: "1px solid var(--light-white-solid)",
                borderRadius: "5px",
              }}
            />
            <canvas
              width="500"
              height="500"
              ref={canvasRef}
              style={{
                position: "absolute",
              }}
            />
          </div>
          <div className={styles.expressions}>
            {(!!faceExpression && handleGetExpression(faceExpression)) ||
              (!isVideoOn && "Sem expressão")}
          </div>
          <Button name="start-video-button" onClick={handleVideo} type="button">
            {isVideoOn ? "Parar" : "Iniciar"}
          </Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.title}>Powered by </p>
        <div>
          <a
            href="https://luislenzi.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <p>Luis Lenzi</p>
            </span>
          </a>
          <a
            href="https://luislenzi.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <p>Victor Bento</p>
            </span>
          </a>
          <a
            href="https://luislenzi.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <p>Hugo Massote</p>
            </span>
          </a>
          <a
            href="https://luislenzi.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.logo}>
              <p>Guilherme Cruz</p>
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
