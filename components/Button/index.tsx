import { CSSProperties, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  name: string;
  children: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  type: "button" | "submit" | "reset";
}

export default function Button({
  type,
  name,
  style,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      name={name}
      style={style}
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
}
