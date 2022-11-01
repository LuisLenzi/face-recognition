import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import Button from "../Button";
import { Tooltips } from "../Tooltip";

import styles from "./Sidebar.module.scss";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCamera, FiHome, FiImage } from "react-icons/fi";
import { BiCopyright } from "react-icons/bi";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome size={18} />,
    },
    {
      name: "Detecção de Faces",
      path: "/face-detection",
      icon: <FiCamera size={18} />,
    },
    {
      name: "Detecção de Imagens",
      path: "/image-detection",
      icon: <FiImage size={18} />,
    },
    {
      name: "Autores",
      path: "/autors",
      icon: <BiCopyright size={20} />,
    },
  ];

  return (
    <header
      className={styles.sidebar}
      style={{
        transition: "all 0.3s ease-in-out",
        width: isSidebarOpen ? "325px" : "125px",
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
          <Link
            key={route.name}
            href={route.path}
            passHref
            style={{
              width: "100%",
            }}
          >
            <Button
              name={route.name}
              type="button"
              style={{
                transition: "all 0.3s ease-in-out",
                border:
                  router.pathname === route.path
                    ? "2px solid var(--gray-100)"
                    : "2px solid var(--swamp-green)",
                backgroundColor:
                  router.pathname === route.path
                    ? "transparent"
                    : "var(--swamp-green)",
              }}
            >
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
