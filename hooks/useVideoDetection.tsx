import { useCallback, useContext, useState } from "react";

import * as faceapi from "face-api.js";

import { Context } from "../context";

export interface FaceExpressionProps {
  key: string;
  value: number;
}

export const useVideoDetection = () => {
  const [videoRef, setImageRef] = useState<HTMLVideoElement[]>();
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement[]>();

  const handleGetVideoRefs = useCallback((videoRefs: HTMLVideoElement[]) => {
    setImageRef(videoRefs);
  }, []);

  const handleGetCanvasRefs = useCallback((canvasRefs: HTMLCanvasElement[]) => {
    setCanvasRef(canvasRefs);
  }, []);

  const { handleLoading } = useContext(Context);

  const loadModels = useCallback(async () => {
    handleLoading(true);

    const MODEL_URL = "/models";

    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceDetectionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

    handleLoading(false);
  }, [handleLoading]);

  const detect = useCallback(async () => {
    if (videoRef?.length && canvasRef?.length) {
      const [videoRef1, videoRef2] = videoRef;
      const [canvasRef1, canvasRef2] = canvasRef;

      const displaySize1 = { width: videoRef1.width, height: videoRef1.height };
      const displaySize2 = { width: videoRef2.width, height: videoRef2.height };

      faceapi.matchDimensions(canvasRef1, displaySize1, true);
      faceapi.matchDimensions(canvasRef2, displaySize2, true);

      const detections1 = await faceapi
        .detectAllFaces(
          videoRef1,
          new faceapi.TinyFaceDetectorOptions({
            scoreThreshold: 0.65,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      const detections2 = await faceapi
        .detectAllFaces(
          videoRef2,
          new faceapi.TinyFaceDetectorOptions({
            scoreThreshold: 0.65,
          })
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections1 = faceapi.resizeResults(
        detections1,
        displaySize1
      );
      const resizedDetections2 = faceapi.resizeResults(
        detections2,
        displaySize2
      );

      faceapi.draw.drawDetections(canvasRef1, resizedDetections1);
      faceapi.draw.drawDetections(canvasRef2, resizedDetections2);

      faceapi.draw.drawFaceLandmarks(canvasRef1, resizedDetections1);
      faceapi.draw.drawFaceLandmarks(canvasRef2, resizedDetections2);

      faceapi.draw.drawFaceExpressions(canvasRef1, resizedDetections1);
      faceapi.draw.drawFaceExpressions(canvasRef2, resizedDetections2);
    }
  }, [canvasRef, videoRef]);

  return {
    detect,
    videoRef,
    canvasRef,
    loadModels,
    handleGetVideoRefs,
    handleGetCanvasRefs,
  };
};
