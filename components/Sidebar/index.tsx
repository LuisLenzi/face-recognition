import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Button from "../Button";
import { Tooltips } from "../Tooltip";

import styles from "./Sidebar.module.scss";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCamera, FiHome, FiImage } from "react-icons/fi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome size={18} />,
      tooltip: "Voltar para o Início",
    },
    {
      name: "Face Detection",
      path: "/face-detection",
      icon: <FiCamera size={18} />,
      tooltip: "Reconhecimento de Expressões Faciais",
    },
    {
      name: "Image Detetion",
      path: "/image-detection",
      icon: <FiImage size={18} />,
      tooltip: "Reconhecimento de Imagens",
    },
  ];

  return (
    <header
      className={styles.sidebar}
      style={{
        transition: "all 0.3s ease-in-out",
        width: isSidebarOpen ? "325px" : "130px",
      }}
    >
      <div className={styles.sidebarLogo}>
        {isSidebarOpen ? (
          <Image
            src="/assets/favicon-black.svg"
            alt="Face Recognition Logo"
            width={125}
            height={50}
          />
        ) : (
          <Image
            src="/favicon.svg"
            alt="Short Face Recognition Logo"
            width={50}
            height={50}
          />
        )}
      </div>
      <div className={styles.buttons}>
        {routes.map((route) => (
          <Link key={route.name} href={route.path} passHref>
            <Button name={route.name} type="button">
              {route.icon}
              {isSidebarOpen && (
                <p className={styles.buttonName}>{route.name}</p>
              )}
            </Button>
          </Link>
        ))}
      </div>
      <div className={styles.hide}>
        <Tooltips
          title={
            isSidebarOpen ? "Reduzir menu lateral" : "Expandir menu lateral"
          }
          placement="right"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button name="hide-button" type="button" onClick={handleSidebar}>
              {isSidebarOpen ? (
                <FaArrowLeft size={18} />
              ) : (
                <FaArrowRight size={18} />
              )}
            </Button>
          </div>
        </Tooltips>
      </div>
    </header>
  );
}
