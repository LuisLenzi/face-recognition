/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef } from "react";

import { BiAngry, BiHappy, BiSad } from "react-icons/bi";
import { FaRegDizzy, FaRegSurprise } from "react-icons/fa";
import { MdOutlineSentimentNeutral } from "react-icons/md";

import { useImageDetection } from "../../hooks/useImageDetection";
import Button from "../Button";

import { Tooltips } from "../Tooltip";

import styles from "./Image.module.scss";

export default function ImageComponent() {
  const {
    detect,
    loadModels,
    faceExpression,
    handleGetImageRefs,
    handleGetCanvasRefs,
    handleSaveExpressions,
  } = useImageDetection();

  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);
  const imageRef4 = useRef<HTMLImageElement>(null);

  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const canvasRef4 = useRef<HTMLCanvasElement>(null);

  const handleLoadModels = useCallback(async () => {
    await loadModels();
  }, [loadModels]);

  useEffect(() => {
    handleLoadModels();

    handleGetImageRefs([
      imageRef1.current as HTMLImageElement,
      imageRef2.current as HTMLImageElement,
      imageRef3.current as HTMLImageElement,
      imageRef4.current as HTMLImageElement,
    ]);

    handleGetCanvasRefs([
      canvasRef1.current as HTMLCanvasElement,
      canvasRef2.current as HTMLCanvasElement,
      canvasRef3.current as HTMLCanvasElement,
      canvasRef4.current as HTMLCanvasElement,
    ]);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas1 = canvasRef1.current as HTMLCanvasElement;
    const canvas2 = canvasRef2.current as HTMLCanvasElement;
    const canvas3 = canvasRef3.current as HTMLCanvasElement;
    const canvas4 = canvasRef4.current as HTMLCanvasElement;

    const ctx1 = canvas1.getContext("2d");
    const ctx2 = canvas2.getContext("2d");
    const ctx3 = canvas3.getContext("2d");
    const ctx4 = canvas4.getContext("2d");

    ctx1?.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2?.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3?.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx4?.clearRect(0, 0, canvas4.width, canvas4.height);

    handleSaveExpressions([]);
  }, []);

  const getEmojiExpression = useCallback(
    (index: number) => {
      if (faceExpression) {
        faceExpression.map((expression) => {
          const { key } = expression[index];

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
        });
      }

      return <MdOutlineSentimentNeutral size={25} />;
    },
    [faceExpression]
  );

  const images = [
    {
      id: 1,
      src: "/assets/luis.png",
      alt: "Imagem 1",
      imageRef: imageRef1,
      canvasRef: canvasRef1,
    },
    {
      id: 2,
      src: "/assets/victor.png",
      alt: "Imagem 2",
      imageRef: imageRef2,
      canvasRef: canvasRef2,
    },
    {
      id: 3,
      src: "/assets/hugo.png",
      alt: "Imagem 2",
      imageRef: imageRef3,
      canvasRef: canvasRef3,
    },
    {
      id: 4,
      src: "/assets/guilherme.png",
      alt: "Imagem 2",
      imageRef: imageRef4,
      canvasRef: canvasRef4,
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.cards}>
          {images.map((image) => (
            <div className={styles.card} key={image.id}>
              <canvas
                width={275}
                height={400}
                ref={image.canvasRef}
                className={styles.canvas}
                style={{
                  filter: faceExpression?.length
                    ? "blur(0px) grayscale(0)"
                    : "blur(10px) grayscale(1)",
                }}
              />
              <img
                src={image.src}
                alt="Imagem"
                width={275}
                height={400}
                ref={image.imageRef}
                className={styles.image}
                style={{
                  filter: faceExpression?.length
                    ? "blur(0px) grayscale(0)"
                    : "blur(10px) grayscale(1)",
                }}
              />
              <div className={styles.expressions}>
                <Tooltips title={"Expressão"} placement="top">
                  <h3 className={styles.expression}>
                    {(faceExpression?.length &&
                      faceExpression[image.id - 1][0].key) ||
                      "Sem expressão"}
                  </h3>
                </Tooltips>
                <Tooltips title={"Acurácia"} placement="top">
                  <h3 className={styles.acuracy}>
                    {(faceExpression?.length &&
                      (faceExpression[image.id - 1][0].value * 100).toFixed(
                        2
                      )) ||
                      0}
                    %
                  </h3>
                </Tooltips>
                <h3 className={styles.emoji}>{getEmojiExpression(image.id)}</h3>
              </div>
            </div>
          ))}
        </div>
        {!faceExpression?.length ? (
          <Button name="detect-button" type="button" onClick={detect}>
            Who{"'"}s that pokemon?
          </Button>
        ) : (
          <Button name="clear-button" type="button" onClick={clearCanvas}>
            Limpar detecção
          </Button>
        )}
      </div>
    </section>
  );
}
