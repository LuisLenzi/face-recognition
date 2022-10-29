/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { BiAngry, BiHappy, BiSad } from "react-icons/bi";
import { FaRegDizzy, FaRegSurprise } from "react-icons/fa";

import { FiCamera, FiCameraOff } from "react-icons/fi";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { useFaceDetection } from "../../hooks/useFaceDetection";

import Button from "../Button";

import styles from "./Video.module.scss";

export default function Video() {
  const {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    startVideo,
    faceExpression,
  } = useFaceDetection();

  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  const handleVideo = useCallback(async () => {
    setIsVideoOn(!isVideoOn);

    if (!isVideoOn) {
      await startVideo();
    }

    if (isVideoOn && videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [isVideoOn, startVideo, videoRef]);

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
          {!isVideoOn && (
            <h3
              style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "var(--gray-100)",
                gap: "1rem",
                textAlign: "center",
              }}
            >
              <FiCameraOff size={50} />
              Ative sua câmera para começar a usar
              <br /> a ferramenta de reconhecimento
            </h3>
          )}
          <canvas
            width={850}
            height={700}
            ref={canvasRef}
            style={{
              zIndex: 1,
              position: "absolute",
              borderRadius: "15px",
            }}
          />

          <video
            muted
            autoPlay
            width={850}
            height={700}
            ref={videoRef}
            onPlay={detect}
            className={styles.video}
            style={{
              zIndex: 0,
              borderRadius: "15px",
            }}
          />
        </div>

        <div
          className={styles.expressions}
          style={{
            display: isVideoOn ? "flex" : "none",
            gap: ".5rem",
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
          }}
        >
          <h3
            style={{
              color: "var(--gray-700)",
              padding: "0.75rem 1rem",
              background: "var(--gray-100)",
              letterSpacing: "-0.05rem",
              fontWeight: 500,
              borderRadius: "2rem",
              fontSize: "1rem",
            }}
          >
            {faceExpression?.key || "Sem expressão"}
          </h3>
          <h3
            style={{
              color: "var(--gray-700)",
              padding: "0.75rem 1rem",
              background: "var(--gray-100)",
              letterSpacing: "-0.05rem",
              fontWeight: 500,
              borderRadius: "2rem",
              fontSize: "1rem",
            }}
          >
            {faceExpression?.value.toFixed(2) || 0}%
          </h3>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--gray-100)",
              padding: "0.5rem",
              background: "var(--moss-green)",
              borderRadius: "2rem",
            }}
          >
            {getEmojiExpression() || <MdOutlineSentimentNeutral size={25} />}
          </h3>
        </div>

        <Button
          type="button"
          onClick={handleVideo}
          name="start-video-button"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
          }}
        >
          {isVideoOn ? (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                gap: "1rem",
              }}
            >
              <FiCameraOff size={18} /> Desativar câmera
            </p>
          ) : (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                gap: "1rem",
              }}
            >
              <FiCamera size={18} /> Ativar câmera
            </p>
          )}
        </Button>
      </div>
    </section>
  );
}
