import styles from "./Button.module.scss";

interface ButtonProps {
  name: string;
  onClick: () => void;
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
}

export default function Button({
  type,
  name,
  onClick,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      name={name}
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  );
}
