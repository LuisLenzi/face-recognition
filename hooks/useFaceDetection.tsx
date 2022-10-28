import { useCallback, useRef, useState } from "react";

import * as faceapi from "face-api.js";

import { FaceExpressions } from "face-api.js";

export const useFaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [faceExpression, setFaceExpression] = useState<FaceExpressions>();

  const loadModels = useCallback(async () => {
    const MODEL_URL = "/models";

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
  }, []);

  const startVideo = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {},
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, []);

  const detect = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const displaySize = { width: video.width, height: video.height };

      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      setFaceExpression(resizedDetections[0]?.expressions);
    }
  }, []);

  return {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    startVideo,
    faceExpression,
  };
};
