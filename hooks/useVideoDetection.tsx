import { useCallback, useContext, useRef, useState } from "react";

import * as faceapi from "face-api.js";

import { FaceExpressions } from "face-api.js";

import { Context } from "../context";

export interface FaceExpressionProps {
  key: string;
  value: number;
}

export const useVideoDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { handleLoading } = useContext(Context);

  const [faceExpression, setFaceExpression] = useState<FaceExpressionProps>();

  const loadModels = useCallback(async () => {
    handleLoading(true);

    const MODEL_URL = "/models";

    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

    handleLoading(false);
  }, [handleLoading]);

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
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const displaySize = { width: video.width, height: video.height };

      faceapi.matchDimensions(canvas, displaySize, true);

      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.SsdMobilenetv1Options({
            minConfidence: 0.65,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      handleGetExpression(resizedDetections[0]?.expressions as FaceExpressions);
    }
  }, [handleGetExpression]);

  return {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    faceExpression,
  };
};
