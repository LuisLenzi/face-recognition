/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState, useContext } from "react";

import { FiAlertTriangle, FiCamera, FiCameraOff } from "react-icons/fi";
import { BiAngry, BiHappy, BiSad } from "react-icons/bi";
import { FaRegDizzy, FaRegSurprise } from "react-icons/fa";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { Context } from "../../context";
import { useCamDetection } from "../../hooks/useCamDetection";

import Button from "../Button";
import { Tooltips } from "../Tooltip";

import styles from "./Video.module.scss";

export default function VideoComponent() {
  const {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    startVideo,
    faceExpression,
  } = useCamDetection();

  const { handleLoading } = useContext(Context);

  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 150);

    return () => clearInterval(interval);
  }, [detect]);

  const handleVideo = useCallback(async () => {
    setIsVideoOn(!isVideoOn);

    if (!isVideoOn) {
      handleLoading(true);
      await startVideo();
      handleLoading(false);
    }

    if (isVideoOn && videoRef.current) {
      videoRef.current.pause();

      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
  }, [handleLoading, isVideoOn, startVideo, videoRef]);

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
                padding: isVideoOn ? "0" : "2rem",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "var(--gray-100)",
                maxWidth: "400px",
                gap: "1rem",
                textAlign: "center",
              }}
            >
              <FiCameraOff size={50} />
              Ative sua câmera para começar a usar a ferramenta de
              reconhecimento
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  color: "var(--gray-300)",
                  fontSize: "0.95rem",
                  maxWidth: "500px",
                }}
              >
                <FiAlertTriangle /> A câmera só será ativada quando você clicar
              </p>
            </h3>
          )}
          <canvas ref={canvasRef} className={styles.canvas} />

          <video
            muted
            autoPlay
            width={900}
            height={775}
            ref={videoRef}
            onPlay={detect}
            className={styles.video}
          />
        </div>

        <div
          className={styles.expressions}
          style={{
            display: isVideoOn ? "flex" : "none",
          }}
        >
          <Tooltips title={"Expressão"} placement="top">
            <h3 className={styles.expression}>
              {faceExpression?.key || "Sem expressão"}
            </h3>
          </Tooltips>
          <Tooltips title={"Acurácia"} placement="top">
            <h3 className={styles.acuracy}>
              {(faceExpression && (faceExpression?.value * 100).toFixed(2)) ||
                0}
              %
            </h3>
          </Tooltips>
          <h3 className={styles.emoji}>
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
            zIndex: 2,
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
