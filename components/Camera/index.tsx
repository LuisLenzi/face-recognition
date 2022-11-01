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

import styles from "./Camera.module.scss";

export default function CameraComponent() {
  const {
    detect,
    cameraRef,
    canvasRef,
    loadModels,
    startCamera,
    faceExpression,
  } = useCamDetection();

  const { handleLoading } = useContext(Context);

  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);

    return () => clearInterval(interval);
  }, [detect]);

  const handleCamera = useCallback(async () => {
    setIsCameraOn(!isCameraOn);

    if (!isCameraOn) {
      handleLoading(true);
      await startCamera();
      handleLoading(false);
    }

    if (isCameraOn && cameraRef.current) {
      cameraRef.current.pause();

      const stream = cameraRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      cameraRef.current.srcObject = null;
    }
  }, [handleLoading, isCameraOn, startCamera, cameraRef]);

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
          {!isCameraOn && (
            <h3
              style={{
                padding: isCameraOn ? "0" : "2rem",
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
            ref={cameraRef}
            onPlay={detect}
            className={styles.camera}
          />
        </div>

        <div
          className={styles.expressions}
          style={{
            display: isCameraOn ? "flex" : "none",
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
          onClick={handleCamera}
          name="start-camera-button"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            zIndex: 2,
          }}
        >
          {isCameraOn ? (
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
