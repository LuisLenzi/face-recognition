import { useCallback, useContext, useRef, useState } from "react";

import * as faceapi from "face-api.js";

import { FaceExpressions } from "face-api.js";

import { Context } from "../context";

export interface FaceExpressionProps {
  key: string;
  value: number;
}

export const useCamDetection = () => {
  const cameraRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { handleLoading } = useContext(Context);

  const [faceExpression, setFaceExpression] = useState<FaceExpressionProps>();

  const loadModels = useCallback(async () => {
    handleLoading(true);

    const MODEL_URL = "/models";

    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    handleLoading(false);
  }, [handleLoading]);

  const startCamera = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {},
    });

    if (cameraRef.current) {
      cameraRef.current.srcObject = stream;
    }
  }, []);

  const handleGetExpression = useCallback(
    (faceExpressions: FaceExpressions) => {
      if (faceExpressions) {
        const { angry, disgusted, fearful, happy, neutral, sad, surprised } =
          faceExpressions;

        const expressions = [
          { key: "Triste", value: sad },
          { key: "Bravo", value: angry },
          { key: "Feliz", value: happy },
          { key: "Neutro", value: neutral },
          { key: "Com medo", value: fearful },
          { key: "Surpreso", value: surprised },
          { key: "Repugnado", value: disgusted },
        ];

        const expression = expressions.reduce((prev, current) =>
          prev.value > current.value ? prev : current
        );

        setFaceExpression(expression);
      }
    },
    []
  );

  const detect = useCallback(async () => {
    if (cameraRef.current && canvasRef.current) {
      const camera = cameraRef.current;
      const canvas = canvasRef.current;

      const displaySize = { width: camera.width, height: camera.height };

      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(camera, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      handleGetExpression(resizedDetections[0]?.expressions as FaceExpressions);
    }
  }, [handleGetExpression]);

  return {
    detect,
    cameraRef,
    canvasRef,
    loadModels,
    startCamera,
    faceExpression,
  };
};
