import { useCallback, useContext, useRef, useState } from "react";

import * as faceapi from "face-api.js";

import { FaceExpressions } from "face-api.js";

import { Context } from "../context";

interface FaceExpressionProps {
  key: string;
  value: number;
}

export const useImageDetection = () => {
  const { handleLoading } = useContext(Context);

  const [imageRef, setImageRef] = useState<HTMLImageElement[]>();
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement[]>();
  const [faceExpression, setFaceExpression] =
    useState<FaceExpressionProps[][]>();

  const handleGetImageRefs = useCallback((imageRefs: HTMLImageElement[]) => {
    setImageRef(imageRefs);
  }, []);

  const handleGetCanvasRefs = useCallback((canvasRefs: HTMLCanvasElement[]) => {
    setCanvasRef(canvasRefs);
  }, []);

  const handleSaveExpressions = useCallback(
    (expressions: FaceExpressionProps[][]) => {
      setFaceExpression(expressions);
    },
    []
  );

  const handleGetExpression = useCallback(
    (faceExpressions: FaceExpressions[]) => {
      if (faceExpressions?.length) {
        const expressions = faceExpressions.map((expression) => {
          const { angry, disgusted, fearful, happy, neutral, sad, surprised } =
            expression;

          const expressions = [
            { key: "Triste", value: sad },
            { key: "Bravo", value: angry },
            { key: "Feliz", value: happy },
            { key: "Neutro", value: neutral },
            { key: "Com medo", value: fearful },
            { key: "Surpreso", value: surprised },
            { key: "Repugnado", value: disgusted },
          ];

          return expressions.sort((a, b) => b.value - a.value);
        });

        handleSaveExpressions(expressions);
      }
    },
    [handleSaveExpressions]
  );

  const detect = useCallback(async () => {
    handleLoading(true);
    if (imageRef?.length && canvasRef?.length) {
      const [imageRef1, imageRef2, imageRef3, imageRef4] = imageRef;
      const [canvasRef1, canvasRef2, canvasRef3, canvasRef4] = canvasRef;

      const options = new faceapi.SsdMobilenetv1Options();

      const person1 = await faceapi
        .detectSingleFace(imageRef1, options)
        .withFaceExpressions();

      const person2 = await faceapi
        .detectSingleFace(imageRef2, options)
        .withFaceExpressions();

      const person3 = await faceapi
        .detectSingleFace(imageRef3, options)
        .withFaceExpressions();

      const person4 = await faceapi
        .detectSingleFace(imageRef4, options)
        .withFaceExpressions();

      const resizedPerson1 = faceapi.resizeResults(person1, {
        width: imageRef1.width,
        height: imageRef1.height,
      });

      const resizedPerson2 = faceapi.resizeResults(person2, {
        width: imageRef2.width,
        height: imageRef2.height,
      });

      const resizedPerson3 = faceapi.resizeResults(person3, {
        width: imageRef3.width,
        height: imageRef3.height,
      });

      const resizedPerson4 = faceapi.resizeResults(person4, {
        width: imageRef4.width,
        height: imageRef4.height,
      });

      const displaySize1 = { width: imageRef1.width, height: imageRef1.height };
      const displaySize2 = { width: imageRef2.width, height: imageRef2.height };
      const displaySize3 = { width: imageRef3.width, height: imageRef3.height };
      const displaySize4 = { width: imageRef4.width, height: imageRef4.height };

      faceapi.matchDimensions(canvasRef1, displaySize1);
      faceapi.matchDimensions(canvasRef2, displaySize2);
      faceapi.matchDimensions(canvasRef3, displaySize3);
      faceapi.matchDimensions(canvasRef4, displaySize4);

      const detection1 = await faceapi
        .detectAllFaces(imageRef1, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      const detection2 = await faceapi
        .detectAllFaces(imageRef2, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      const detection3 = await faceapi
        .detectAllFaces(imageRef3, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      const detection4 = await faceapi
        .detectAllFaces(imageRef4, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetection1 = faceapi.resizeResults(detection1, displaySize1);
      const resizedDetection2 = faceapi.resizeResults(detection2, displaySize2);
      const resizedDetection3 = faceapi.resizeResults(detection3, displaySize3);
      const resizedDetection4 = faceapi.resizeResults(detection4, displaySize4);

      canvasRef1
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef1.width, canvasRef1.height);

      canvasRef2
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef2.width, canvasRef2.height);

      canvasRef3
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef3.width, canvasRef3.height);

      canvasRef4
        .getContext("2d")
        ?.clearRect(0, 0, canvasRef4.width, canvasRef4.height);

      faceapi.draw.drawFaceLandmarks(canvasRef1, resizedDetection1);
      faceapi.draw.drawFaceLandmarks(canvasRef2, resizedDetection2);
      faceapi.draw.drawFaceLandmarks(canvasRef3, resizedDetection3);
      faceapi.draw.drawFaceLandmarks(canvasRef4, resizedDetection4);

      const faceExpressions1 = resizedPerson1?.expressions;
      const faceExpressions2 = resizedPerson2?.expressions;
      const faceExpressions3 = resizedPerson3?.expressions;
      const faceExpressions4 = resizedPerson4?.expressions;

      const drawBox1 = new faceapi.draw.DrawBox(
        resizedPerson1?.detection.box as faceapi.Box,
        {
          label: "Luís Lenzi",
          boxColor: "darkcyan",
          lineWidth: 2,
          drawLabelOptions: {
            fontSize: 20,
            fontColor: "white",
            fontStyle: "bold",
          },
        }
      );

      const drawBox2 = new faceapi.draw.DrawBox(
        resizedPerson2?.detection.box as faceapi.Box,
        {
          label: "Victor Bento",
          boxColor: "darkcyan",
          lineWidth: 2,
          drawLabelOptions: {
            fontSize: 20,
            fontColor: "white",
            fontStyle: "bold",
          },
        }
      );

      const drawBox3 = new faceapi.draw.DrawBox(
        resizedPerson3?.detection.box as faceapi.Box,
        {
          label: "Hugo Massote",
          boxColor: "darkcyan",
          lineWidth: 2,
          drawLabelOptions: {
            fontSize: 20,
            fontColor: "white",
            fontStyle: "bold",
          },
        }
      );

      const drawBox4 = new faceapi.draw.DrawBox(
        resizedPerson4?.detection.box as faceapi.Box,
        {
          label: "Guilherme Cruz",
          boxColor: "darkcyan",
          lineWidth: 2,
          drawLabelOptions: {
            fontSize: 20,
            fontColor: "white",
            fontStyle: "bold",
          },
        }
      );

      drawBox1.draw(canvasRef1);
      drawBox2.draw(canvasRef2);
      drawBox3.draw(canvasRef3);
      drawBox4.draw(canvasRef4);

      faceapi.draw.drawFaceExpressions(canvasRef1, resizedPerson1 as any);
      faceapi.draw.drawFaceExpressions(canvasRef2, resizedPerson2 as any);
      faceapi.draw.drawFaceExpressions(canvasRef3, resizedPerson3 as any);
      faceapi.draw.drawFaceExpressions(canvasRef4, resizedPerson4 as any);

      handleGetExpression([
        faceExpressions1 as FaceExpressions,
        faceExpressions2 as FaceExpressions,
        faceExpressions3 as FaceExpressions,
        faceExpressions4 as FaceExpressions,
      ]);
    }
    handleLoading(false);
  }, [canvasRef, handleGetExpression, handleLoading, imageRef]);

  const loadModels = useCallback(async () => {
    handleLoading(true);

    const MODEL_URL = "/models";

    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL);

    handleLoading(false);
  }, [handleLoading]);

  return {
    detect,
    imageRef,
    canvasRef,
    loadModels,
    faceExpression,
    handleGetImageRefs,
    handleGetCanvasRefs,
    handleSaveExpressions,
  };
};
