import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import styles from "./Main.module.scss";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <section className={styles.container}>
      <Sidebar />

      <main className={styles.content}>{children}</main>
    </section>
  );
}
