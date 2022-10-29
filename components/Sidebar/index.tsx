import Button from "../Button";
import styles from "./Sidebar.module.scss";

import Link from "next/link";

import { FiCamera, FiHome, FiImage } from "react-icons/fi";

export default function Sidebar() {
  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome size={18} />,
    },
    {
      name: "Face Detection",
      path: "/face-detection",
      icon: <FiCamera size={18} />,
    },
    {
      name: "Image Recognition",
      path: "/image-recognition",
      icon: <FiImage size={18} />,
    },
  ];

  return (
    <header className={styles.sidebar}>
      {routes.map((route) => (
        <Link key={route.name} href={route.path} passHref>
          <Button name={route.name} type="button">
            {route.icon}
            {route.name}
          </Button>
        </Link>
      ))}
    </header>
  );
}
